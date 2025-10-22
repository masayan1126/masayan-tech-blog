import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { LinkCard } from './LinkCard';

export const LinkCardReplacer: React.FC = () => {
  useEffect(() => {
    // Wait for DOM to be fully ready
    const replaceLinkCards = () => {
      console.log('[LinkCardReplacer] Starting to search for link cards...');

      // Find all span elements with class "link-card"
      const linkCardSpans = document.querySelectorAll('span.link-card');
      console.log('[LinkCardReplacer] Found', linkCardSpans.length, 'link card spans');

      linkCardSpans.forEach((span, index) => {
        // Find the anchor tag inside the span
        const anchor = span.querySelector('a');
        if (!anchor) {
          console.warn('[LinkCardReplacer] No anchor found in span', index);
          return;
        }

        const url = anchor.href;
        if (!url) {
          console.warn('[LinkCardReplacer] No URL found in anchor', index);
          return;
        }

        console.log('[LinkCardReplacer] Replacing link card', index, 'with URL:', url);

        // Create a container div for the React component
        const container = document.createElement('div');
        container.className = 'link-card-wrapper';

        // Replace the span with the container
        span.replaceWith(container);

        // Render the LinkCard component
        const root = createRoot(container);
        root.render(<LinkCard url={url} />);
      });
    };

    // Try immediately
    replaceLinkCards();

    // Also try after a short delay to catch any dynamically rendered content
    const timeoutId = setTimeout(replaceLinkCards, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
};
