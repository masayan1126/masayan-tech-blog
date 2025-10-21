import { load } from "cheerio";
import ogs from "open-graph-scraper";

interface LinkCardData {
  title: string;
  siteName: string;
  thumbnail?: string;
  url: string;
}

async function fetchLinkMetadata(url: string): Promise<LinkCardData | null> {
  try {
    console.log(`[LinkCard] Fetching metadata for: ${url}`);

    const { error, result } = await ogs({
      url,
      timeout: 3000, // 3 second timeout
      fetchOptions: {
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; LinkCardBot/1.0)'
        }
      }
    });

    if (error) {
      console.error(`[LinkCard] Failed to fetch metadata for ${url}:`, error);
      return null;
    }

    // Extract thumbnail (OG image)
    let thumbnail: string | undefined;
    if (result.ogImage) {
      if (Array.isArray(result.ogImage) && result.ogImage.length > 0) {
        thumbnail = result.ogImage[0].url;
        console.log(`[LinkCard] Found thumbnail (array): ${thumbnail}`);
      } else if (typeof result.ogImage === 'object' && 'url' in result.ogImage && typeof result.ogImage.url === 'string') {
        thumbnail = result.ogImage.url;
        console.log(`[LinkCard] Found thumbnail (object): ${thumbnail}`);
      } else if (typeof result.ogImage === 'string') {
        thumbnail = result.ogImage;
        console.log(`[LinkCard] Found thumbnail (string): ${thumbnail}`);
      }

      // Convert relative URLs to absolute
      if (thumbnail && !thumbnail.startsWith('http')) {
        const baseUrl = new URL(url);
        thumbnail = new URL(thumbnail, baseUrl.origin).href;
        console.log(`[LinkCard] Converted relative URL to absolute: ${thumbnail}`);
      }
    } else {
      console.log(`[LinkCard] No ogImage found for ${url}`);
    }

    const metadata = {
      title: result.ogTitle || result.twitterTitle || url,
      siteName: result.ogSiteName || new URL(url).hostname,
      thumbnail,
      url,
    };

    console.log(`[LinkCard] Metadata extracted:`, JSON.stringify(metadata, null, 2));

    return metadata;
  } catch (error) {
    console.error(`[LinkCard] Exception while fetching metadata for ${url}:`, error);
    return null;
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

function generateLinkCardHTML(data: LinkCardData): string {
  const { title, siteName, thumbnail, url } = data;

  // Escape HTML to prevent XSS
  const escapedTitle = escapeHtml(title);
  const escapedSiteName = escapeHtml(siteName);
  const escapedUrl = escapeHtml(url);

  const html = `
    <a href="${escapedUrl}" class="link-card" target="_blank" rel="noopener noreferrer">
      ${
        thumbnail
          ? `<div class="link-card-thumbnail">
               <img src="${escapeHtml(thumbnail)}" alt="${escapedTitle}" loading="lazy">
             </div>`
          : ""
      }
      <div class="link-card-content">
        <div class="link-card-header">
          <span class="link-card-site-name">${escapedSiteName}</span>
        </div>
        <div class="link-card-title">${escapedTitle}</div>
      </div>
    </a>
  `.trim();

  console.log(`[LinkCard] Generated HTML for ${url}:`, html.substring(0, 200) + '...');

  return html;
}

export async function attachLinkCards(content: string): Promise<string> {
  const $ = load(content);

  console.log(`[LinkCard] Processing content (first 500 chars):`, content.substring(0, 500));

  // Find all <span class="link-card">...</span>
  const linkCardSpans = $('span.link-card');

  console.log(`[LinkCard] Found ${linkCardSpans.length} link-card spans`);

  if (linkCardSpans.length === 0) {
    return content;
  }

  // Collect all links and their elements
  const linksToProcess: { element: any; href: string }[] = [];

  linkCardSpans.each((_, element) => {
    const $element = $(element);

    // Check if there's an <a> tag inside (old format)
    const $link = $element.find('a');
    let href = $link.attr('href');

    // If no <a> tag, treat the text content as the URL (new format)
    if (!href) {
      href = $element.text().trim();
    }

    if (href) {
      console.log(`[LinkCard] Found link to process: ${href}`);
      linksToProcess.push({ element: $element, href });
    }
  });

  // Fetch metadata for all links in parallel
  const metadataPromises = linksToProcess.map(({ href }) => fetchLinkMetadata(href));
  const metadataResults = await Promise.all(metadataPromises);

  // Replace each span with the rich link card
  linksToProcess.forEach(({ element }, index) => {
    const data = metadataResults[index];
    const { href } = linksToProcess[index];

    const $element = $(element);
    let $parent = $element.parent();

    if (data) {
      const richCardHTML = generateLinkCardHTML(data);
      console.log(`[LinkCard] SUCCESS - Replacing span with card HTML for: ${data.url}`);
      console.log(`[LinkCard] Data:`, { title: data.title, thumbnail: data.thumbnail });

      // Check if parent is <a>, and if so, check grandparent
      if ($parent.is('a')) {
        console.log(`[LinkCard] Parent is <a> tag, checking grandparent`);
        const $grandparent = $parent.parent();
        if ($grandparent.is('p') && $grandparent.children().length === 1) {
          console.log(`[LinkCard] Replacing grandparent <p> tag`);
          $grandparent.replaceWith(richCardHTML);
        } else {
          console.log(`[LinkCard] Replacing parent <a> tag`);
          $parent.replaceWith(richCardHTML);
        }
      } else if ($parent.is('p') && $parent.children().length === 1 && $parent.text().trim() === $element.text().trim()) {
        console.log(`[LinkCard] Replacing parent <p> tag`);
        $parent.replaceWith(richCardHTML);
      } else {
        console.log(`[LinkCard] Replacing element only`);
        element.replaceWith(richCardHTML);
      }
    } else {
      // Fallback: Create a basic card with just the URL
      console.log(`[LinkCard] FALLBACK - No metadata found for ${href}, creating fallback card`);
      const fallbackData: LinkCardData = {
        title: href,
        siteName: new URL(href).hostname,
        url: href,
      };
      const fallbackHTML = generateLinkCardHTML(fallbackData);
      console.log(`[LinkCard] Fallback HTML:`, fallbackHTML.substring(0, 200));

      // Check if parent is <a>, and if so, check grandparent
      if ($parent.is('a')) {
        console.log(`[LinkCard] Parent is <a> tag, checking grandparent (fallback)`);
        const $grandparent = $parent.parent();
        if ($grandparent.is('p') && $grandparent.children().length === 1) {
          console.log(`[LinkCard] Replacing grandparent <p> tag (fallback)`);
          $grandparent.replaceWith(fallbackHTML);
        } else {
          console.log(`[LinkCard] Replacing parent <a> tag (fallback)`);
          $parent.replaceWith(fallbackHTML);
        }
      } else if ($parent.is('p') && $parent.children().length === 1 && $parent.text().trim() === $element.text().trim()) {
        console.log(`[LinkCard] Replacing parent <p> tag (fallback)`);
        $parent.replaceWith(fallbackHTML);
      } else {
        console.log(`[LinkCard] Replacing element only (fallback)`);
        element.replaceWith(fallbackHTML);
      }
    }
  });

  return $.html();
}
