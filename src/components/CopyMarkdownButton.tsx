import { useState, useCallback } from "react";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

type Props = {
  htmlContent: string;
  title: string;
};

export default function CopyMarkdownButton({ htmlContent, title }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      const turndownService = new TurndownService({
        headingStyle: "atx",
        codeBlockStyle: "fenced",
        bulletListMarker: "-",
      });

      // GFMプラグインを使用（テーブル、取り消し線、タスクリストをサポート）
      turndownService.use(gfm);

      // リンクカードのカスタムルール
      turndownService.addRule("linkCard", {
        filter: (node) => {
          return (
            node.nodeName === "A" &&
            node.classList.contains("link-card")
          );
        },
        replacement: (_content, node) => {
          const href = (node as HTMLAnchorElement).getAttribute("href") || "";
          const titleEl = node.querySelector(".link-card-title");
          const linkTitle = titleEl?.textContent || href;
          return `[${linkTitle}](${href})`;
        },
      });

      // iframeをスキップ
      turndownService.addRule("iframe", {
        filter: "iframe",
        replacement: () => "",
      });

      // 記事タイトルをヘッダーとして追加
      const markdown = `# ${title}\n\n${turndownService.turndown(htmlContent)}`;

      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy markdown:", error);
    }
  }, [htmlContent, title]);

  return (
    <button
      onClick={handleCopy}
      className="copy-markdown-button"
      aria-label="マークダウンをコピー"
    >
      {copied ? (
        <>
          <svg className="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="copy-label">Copied!</span>
        </>
      ) : (
        <>
          <svg className="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          </svg>
          <span className="copy-label">マークダウンでコピー</span>
        </>
      )}
    </button>
  );
}
