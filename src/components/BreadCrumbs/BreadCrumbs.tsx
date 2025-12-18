type Props = {
  lists: {
    name: string;
    path: string;
  }[];
};

export const BreadCrumbs = ({ lists }: Props) => {
  if (!lists || lists.length === 0) {
    return null;
  }

  return (
    <>
      <style>{`
        .breadcrumbs-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow-x: auto;
          white-space: nowrap;
          margin-top: 1rem;
          margin-bottom: 1rem;
          padding: 0.75rem 1rem;
          background: #2a2a2a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          font-size: 0.875rem;
        }

        @media (min-width: 768px) {
          .breadcrumbs-container {
            margin-top: 1.5rem;
            font-size: 0.95rem;
          }
        }

        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .breadcrumb-link {
          color: var(--color-primary);
          text-decoration: none;
          transition: all 0.2s ease;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .breadcrumb-link:hover {
          color: #FFC857;
          text-decoration: underline;
        }

        .breadcrumb-current {
          color: #d1cfcf;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .breadcrumb-separator {
          color: rgba(var(--color-primary-rgb), 0.5);
          font-size: 0.75rem;
        }

        .home-icon {
          width: 1rem;
          height: 1rem;
          display: inline-block;
          vertical-align: middle;
        }
      `}</style>
      <ol
        className="breadcrumbs-container"
        aria-label="breadcrumb"
      >
        {lists.map(({ name, path }, index) => (
          <li className="breadcrumb-item" key={index}>
            {lists.length - 1 !== index ? (
              <>
                <a className="breadcrumb-link" href={path}>
                  {index === 0 && (
                    <svg className="home-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  )}
                  {name}
                </a>
                <span className="breadcrumb-separator">→</span>
              </>
            ) : (
              <span className="breadcrumb-current">
                {index === 0 && (
                  <svg className="home-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                )}
                {name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </>
  );
};
