import { load } from "cheerio";
import ogs from "open-graph-scraper";

interface LinkCardData {
  title: string;
  siteName: string;
  thumbnail?: string;
  favicon?: string;
  url: string;
}

async function fetchLinkMetadata(url: string): Promise<LinkCardData | null> {
  try {
    console.log(`[LinkCard] Fetching metadata for: ${url}`);

    const { error, result } = await ogs({
      url,
      timeout: 5000, // 5 second timeout
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

    // Extract favicon URL
    let favicon = result.favicon;
    if (!favicon) {
      // Fallback to default favicon location
      const urlObj = new URL(url);
      favicon = `${urlObj.origin}/favicon.ico`;
    }

    // Extract thumbnail (OG image)
    let thumbnail: string | undefined;
    if (result.ogImage) {
      if (Array.isArray(result.ogImage) && result.ogImage.length > 0) {
        thumbnail = result.ogImage[0].url;
        console.log(`[LinkCard] Found thumbnail (array): ${thumbnail}`);
      } else if (typeof result.ogImage === 'object' && 'url' in result.ogImage) {
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
      favicon,
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
  const { title, siteName, thumbnail, favicon, url } = data;

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
          ${
            favicon
              ? `<img src="${escapeHtml(favicon)}" class="link-card-favicon" alt="" loading="lazy">`
              : ""
          }
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

  // Find all <span class="link-card"><a href="...">...</a></span>
  const linkCardSpans = $('span.link-card');

  console.log(`[LinkCard] Found ${linkCardSpans.length} link-card spans`);

  if (linkCardSpans.length === 0) {
    return content;
  }

  // Collect all links and their elements
  const linksToProcess: { element: any; href: string }[] = [];

  linkCardSpans.each((_, element) => {
    const $element = $(element);
    const $link = $element.find('a');
    const href = $link.attr('href');

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
    if (data) {
      const richCardHTML = generateLinkCardHTML(data);
      console.log(`[LinkCard] Replacing span with card HTML for: ${data.url}`);
      element.replaceWith(richCardHTML);
    } else {
      console.log(`[LinkCard] No metadata found, keeping original link`);
    }
  });

  return $.html();
}
