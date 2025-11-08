import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { LinkCard } from './LinkCard';

export const LinkCardReplacer: React.FC = () => {
  useEffect(() => {
    // Wait for DOM to be fully ready
    const replaceLinkCards = () => {
      // Find all span elements with class "link-card"
      const linkCardSpans = document.querySelectorAll('span.link-card');

      linkCardSpans.forEach((span, index) => {
        // Find the anchor tag inside the span
        const anchor = span.querySelector('a');
        if (!anchor) {
          return;
        }

        const url = anchor.href;
        if (!url) {
          return;
        }

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
