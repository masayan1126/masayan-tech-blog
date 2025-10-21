import type { APIRoute } from 'astro';
import * as cheerio from 'cheerio';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'URL parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Fetch the target URL
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract OGP data
    const ogpData = {
      title:
        $('meta[property="og:title"]').attr('content') ||
        $('meta[name="twitter:title"]').attr('content') ||
        $('title').text() ||
        '',
      description:
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="twitter:description"]').attr('content') ||
        $('meta[name="description"]').attr('content') ||
        '',
      image:
        $('meta[property="og:image"]').attr('content') ||
        $('meta[name="twitter:image"]').attr('content') ||
        '',
      siteName:
        $('meta[property="og:site_name"]').attr('content') ||
        '',
      favicon: (() => {
        // Try different favicon locations
        const iconLink =
          $('link[rel="icon"]').attr('href') ||
          $('link[rel="shortcut icon"]').attr('href') ||
          $('link[rel="apple-touch-icon"]').attr('href') ||
          '';

        // Convert relative URL to absolute
        if (iconLink && !iconLink.startsWith('http')) {
          const baseUrl = new URL(targetUrl);
          if (iconLink.startsWith('//')) {
            return `${baseUrl.protocol}${iconLink}`;
          } else if (iconLink.startsWith('/')) {
            return `${baseUrl.origin}${iconLink}`;
          } else {
            return `${baseUrl.origin}/${iconLink}`;
          }
        }

        // Default to /favicon.ico
        if (!iconLink) {
          const baseUrl = new URL(targetUrl);
          return `${baseUrl.origin}/favicon.ico`;
        }

        return iconLink;
      })(),
      url: targetUrl,
    };

    // If no site name, extract from URL
    if (!ogpData.siteName) {
      const urlObj = new URL(targetUrl);
      ogpData.siteName = urlObj.hostname.replace('www.', '');
    }

    return new Response(JSON.stringify(ogpData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching OGP data:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch OGP data',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
