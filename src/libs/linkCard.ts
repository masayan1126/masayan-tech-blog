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
      console.warn(`[LinkCard] Failed to fetch metadata: ${url} - ${result?.error || 'Unknown error'}`);
      return null;
    }

    // Extract thumbnail (OG image)
    let thumbnail: string | undefined;
    if (result.ogImage) {
      if (Array.isArray(result.ogImage) && result.ogImage.length > 0) {
        thumbnail = result.ogImage[0].url;
      } else if (typeof result.ogImage === 'object' && 'url' in result.ogImage && typeof result.ogImage.url === 'string') {
        thumbnail = result.ogImage.url;
      } else if (typeof result.ogImage === 'string') {
        thumbnail = result.ogImage;
      }

      // Convert relative URLs to absolute
      if (thumbnail && !thumbnail.startsWith('http')) {
        const baseUrl = new URL(url);
        thumbnail = new URL(thumbnail, baseUrl.origin).href;
      }
    }

    const metadata = {
      title: result.ogTitle || result.twitterTitle || url,
      siteName: result.ogSiteName || new URL(url).hostname,
      thumbnail,
      url,
    };

    return metadata;
  } catch (error) {
    console.warn(`[LinkCard] Exception fetching metadata: ${url} - ${error instanceof Error ? error.message : String(error)}`);
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

  return html;
}

export async function attachLinkCards(content: string): Promise<string> {
  const $ = load(content);

  // Find all <span class="link-card">...</span>
  const linkCardSpans = $('span.link-card');

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

      // Check if parent is <a>, and if so, check grandparent
      if ($parent.is('a')) {
        const $grandparent = $parent.parent();
        if ($grandparent.is('p') && $grandparent.children().length === 1) {
          $grandparent.replaceWith(richCardHTML);
        } else {
          $parent.replaceWith(richCardHTML);
        }
      } else if ($parent.is('p') && $parent.children().length === 1 && $parent.text().trim() === $element.text().trim()) {
        $parent.replaceWith(richCardHTML);
      } else {
        element.replaceWith(richCardHTML);
      }
    } else {
      // Fallback: Create a basic card with just the URL
      const fallbackData: LinkCardData = {
        title: href,
        siteName: new URL(href).hostname,
        url: href,
      };
      const fallbackHTML = generateLinkCardHTML(fallbackData);

      // Check if parent is <a>, and if so, check grandparent
      if ($parent.is('a')) {
        const $grandparent = $parent.parent();
        if ($grandparent.is('p') && $grandparent.children().length === 1) {
          $grandparent.replaceWith(fallbackHTML);
        } else {
          $parent.replaceWith(fallbackHTML);
        }
      } else if ($parent.is('p') && $parent.children().length === 1 && $parent.text().trim() === $element.text().trim()) {
        $parent.replaceWith(fallbackHTML);
      } else {
        element.replaceWith(fallbackHTML);
      }
    }
  });

  return $.html();
}
