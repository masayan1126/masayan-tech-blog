<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8"/>

  <xsl:template match="/rss/channel">
    <html>
      <head>
        <meta charset="UTF-8" />
        <title><xsl:value-of select="title"/></title>
        <style>
          :root {
            --bg: #0b1220;
            --card: rgba(255,255,255,0.06);
            --card-border: rgba(255,255,255,0.12);
            --text: #ffffff;
            --muted: rgba(255,255,255,0.7);
            --accent: #f97316; /* orange-500 */
            --accent-600: #ea580c; /* orange-600 */
          }
          * { box-sizing: border-box; }
          body { margin: 0; padding: 32px 16px; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"; background: var(--bg); color: var(--text); }
          .container { max-width: 980px; margin: 0 auto; }
          .header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 24px; }
          .title { font-size: 28px; font-weight: 800; letter-spacing: 0.2px; }
          .subtitle { color: var(--muted); margin-top: 6px; }
          .badge { display:inline-flex; align-items:center; gap:8px; padding:8px 12px; border-radius: 9999px; background: color-mix(in srgb, var(--accent) 18%, transparent); color: #fff; border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent); text-decoration: none; }
          .badge svg { width: 18px; height: 18px; }
          .list { display: grid; grid-template-columns: 1fr; gap: 14px; }
          .item { background: var(--card); border: 1px solid var(--card-border); border-radius: 16px; padding: 16px; transition: background .2s ease, transform .2s ease, border-color .2s ease; }
          .item:hover { background: color-mix(in srgb, var(--accent) 6%, var(--card)); border-color: color-mix(in srgb, var(--accent) 26%, var(--card-border)); transform: translateY(-1px); }
          .item a { color: var(--text); text-decoration: none; }
          .item-title { font-size: 18px; font-weight: 700; margin: 0 0 8px 0; }
          .meta { display:flex; align-items:center; gap:10px; color: var(--muted); font-size: 13px; }
          .dot { width:6px; height:6px; border-radius:9999px; background: var(--accent); display:inline-block; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <div class="title"><xsl:value-of select="title"/></div>
              <div class="subtitle"><xsl:value-of select="description"/></div>
            </div>
            <a class="badge" href="/rss.xml">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.18 17.82a2.18 2.18 0 1 1-4.36 0 2.18 2.18 0 0 1 4.36 0Zm-4.36-7.27v3.27c4.52 0 8.18 3.66 8.18 8.18h3.27c0-6.34-5.11-11.45-11.45-11.45Zm0-5.73v3.27c8.06 0 14.91 6.85 14.91 14.91h3.27C20.99 7.87 13.12 0 1.82 0Z"/></svg>
              <span>RSS</span>
            </a>
          </div>

          <div class="list">
            <xsl:for-each select="item">
              <div class="item">
                <a href="{link}"><div class="item-title"><xsl:value-of select="title"/></div></a>
                <div class="meta">
                  <span class="dot"></span>
                  <span><xsl:value-of select="pubDate"/></span>
                </div>
                <div class="meta" style="margin-top:8px;">
                  <xsl:value-of select="description"/>
                </div>
              </div>
            </xsl:for-each>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
