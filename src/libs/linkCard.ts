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
      console.error(`Failed to fetch metadata for ${url}:`, error);
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
      } else if (typeof result.ogImage === 'object' && 'url' in result.ogImage) {
        thumbnail = result.ogImage.url;
      } else if (typeof result.ogImage === 'string') {
        thumbnail = result.ogImage;
      }
    }

    return {
      title: result.ogTitle || result.twitterTitle || url,
      siteName: result.ogSiteName || new URL(url).hostname,
      thumbnail,
      favicon,
      url,
    };
  } catch (error) {
    console.error(`Failed to fetch metadata for ${url}:`, error);
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

  return `
    <a href="${escapedUrl}" class="rich-link-card" target="_blank" rel="noopener noreferrer">
      ${
        thumbnail
          ? `<div class="rich-link-card-thumbnail">
               <img src="${escapeHtml(thumbnail)}" alt="${escapedTitle}" loading="lazy">
             </div>`
          : ""
      }
      <div class="rich-link-card-content">
        <div class="rich-link-card-header">
          ${
            favicon
              ? `<img src="${escapeHtml(favicon)}" class="rich-link-card-favicon" alt="" loading="lazy">`
              : ""
          }
          <span class="rich-link-card-site-name">${escapedSiteName}</span>
        </div>
        <div class="rich-link-card-title">${escapedTitle}</div>
      </div>
    </a>
  `.trim();
}

export async function attachLinkCards(content: string): Promise<string> {
  const $ = load(content);

  // Find all <span class="link-card"><a href="...">...</a></span>
  const linkCardSpans = $('span.link-card');

  if (linkCardSpans.length === 0) {
    return content;
  }

  // Fetch metadata for all links in parallel
  const metadataPromises: Promise<{ element: any; data: LinkCardData | null }>[] = [];

  linkCardSpans.each((_, element) => {
    const $element = $(element);
    const $link = $element.find('a');
    const href = $link.attr('href');

    if (href) {
      metadataPromises.push(
        fetchLinkMetadata(href).then((data) => ({
          element: $element,
          data,
        }))
      );
    }
  });

  const results = await Promise.all(metadataPromises);

  // Replace each span with the rich link card
  results.forEach(({ element, data }) => {
    if (data) {
      const richCardHTML = generateLinkCardHTML(data);
      element.replaceWith(richCardHTML);
    }
  });

  return $.html();
}
