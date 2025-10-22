import { useEffect, useState } from 'react';

interface OGPData {
  title: string;
  description: string;
  image: string;
  siteName: string;
  favicon: string;
  url: string;
}

interface LinkCardProps {
  url: string;
}

export const LinkCard: React.FC<LinkCardProps> = ({ url }) => {
  const [ogpData, setOgpData] = useState<OGPData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOGP = async () => {
      try {
        console.log('[LinkCard] Fetching OGP data for:', url);
        const response = await fetch(`/api/ogp?url=${encodeURIComponent(url)}`);
        console.log('[LinkCard] Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('[LinkCard] API error:', errorText);
          throw new Error(`Failed to fetch OGP data: ${response.status}`);
        }

        const data = await response.json();
        console.log('[LinkCard] OGP data received:', data);
        setOgpData(data);
      } catch (err) {
        console.error('[LinkCard] Error fetching OGP data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchOGP();
  }, [url]);

  if (loading) {
    return (
      <div className="link-card-container loading">
        <div className="link-card-skeleton">
          <div className="skeleton-thumbnail"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-site"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !ogpData) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="link-card-container fallback"
      >
        <div className="link-card-fallback">
          <span className="fallback-icon">🔗</span>
          <span className="fallback-url">{url}</span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-card-container"
    >
      <div className="link-card">
        {ogpData.image && (
          <div className="link-card-thumbnail">
            <img src={ogpData.image} alt={ogpData.title} loading="lazy" />
          </div>
        )}
        <div className="link-card-content">
          <div className="link-card-header">
            {ogpData.favicon && (
              <img
                src={ogpData.favicon}
                alt=""
                className="link-card-favicon"
                onError={(e) => {
                  // Hide favicon if it fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <span className="link-card-site-name">{ogpData.siteName}</span>
          </div>
          <h3 className="link-card-title">{ogpData.title}</h3>
          {ogpData.description && (
            <p className="link-card-description">{ogpData.description}</p>
          )}
        </div>
      </div>
    </a>
  );
};
