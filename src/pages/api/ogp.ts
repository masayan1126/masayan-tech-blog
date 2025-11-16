import type { APIRoute } from 'astro';
import * as cheerio from 'cheerio';

export const prerender = false;

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

    // Helper function to convert relative URL to absolute
    const toAbsoluteUrl = (relativeUrl: string, baseUrl: string): string => {
      if (!relativeUrl) return '';

      // Already absolute URL
      if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
        return relativeUrl;
      }

      const base = new URL(baseUrl);

      // Protocol-relative URL
      if (relativeUrl.startsWith('//')) {
        return `${base.protocol}${relativeUrl}`;
      }

      // Absolute path
      if (relativeUrl.startsWith('/')) {
        return `${base.origin}${relativeUrl}`;
      }

      // Relative path
      return `${base.origin}/${relativeUrl}`;
    };

    // Extract OGP data
    const rawImage =
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      '';

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
      image: toAbsoluteUrl(rawImage, targetUrl),
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

        if (iconLink) {
          return toAbsoluteUrl(iconLink, targetUrl);
        }

        // Default to /favicon.ico
        const baseUrl = new URL(targetUrl);
        return `${baseUrl.origin}/miyabiya-favicon.ico`;
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
