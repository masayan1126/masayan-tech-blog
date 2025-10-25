export const CATEGORY_LIST = [
  { id: "model-context-protocol", label: "MCP" },
  { id: "claude-code", label: "Claude Code" },
  { id: "ai", label: "AI" },
  { id: "claude", label: "Claude" },
  { id: "visual-studio-code", label: "Visual Studio Code" },
  { id: "cursor", label: "Cursor" },
  { id: "python", label: "Python" },
] as const;

export type CategoryId = typeof CATEGORY_LIST[number]['id'];
