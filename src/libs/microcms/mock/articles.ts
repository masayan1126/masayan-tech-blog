import type { Article } from "../blog";
import { mockCategories } from "./categories";

const getCategory = (id: string) => {
  const category = mockCategories.find((c) => c.id === id);
  if (!category) throw new Error(`Category not found: ${id}`);
  return category;
};

const createDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export const mockArticles: Article[] = [
  // Claude Code (3件)
  {
    id: "mock-claude-code-crash-course",
    createdAt: createDate(1),
    updatedAt: createDate(1),
    publishedAt: createDate(1),
    revisedAt: createDate(1),
    title: "Claude Code クラッシュコース【応用編】メモリ・サブエージェント・プラグイン完全ガイド",
    eyecatch: {
      url: "https://images.microcms-assets.io/assets/c8f47cd9ef654a2d9ca6b6e579be433f/55fd9175bec04a8d97934f7f9bc099bb/ChatGPT%20Image%202025%E5%B9%B412%E6%9C%8819%E6%97%A5%2021_58_32.png",
      width: 1536,
      height: 1024,
    },
    content: `<h2>Claude Code クラッシュコース全シリーズ</h2>
<p>「Maxプランユーザーが教える」ユースケース紹介編</p>
<p>準備中。近日中に公開予定</p>

<h3>入門編</h3>
<p><a href="/blog/mock-claude-code-intro">Claude Code入門編はこちら</a></p>

<h3>基礎編</h3>
<p><a href="/blog/mock-claude-code-basic">Claude Code基礎編はこちら</a></p>

<h3>応用編（本記事）</h3>
<p>この記事です</p>

<h2>要約</h2>
<ul>
<li>Claude Codeの応用的な機能をフル活用し、作業効率、生産性を最大化するための実践ガイド</li>
<li>メモリファイル（CLAUDE.md）によるコンテキスト管理、設定ファイル（settings.json）での権限・環境設定</li>
<li>サブエージェントを使った責務分離、プラグインによる機能拡張</li>
<li>プロフェッショナルレベルでClaude Codeを使いこなすための重要機能を網羅的に解説</li>
</ul>

<p>この記事は、Claude Codeのベストプラクティス、公式ドキュメント、著者自身のClaude Maxプランでの利用体験に基づいています。</p>

<h2>この記事を読むことで得られるメリット</h2>
<table>
<thead>
<tr><th>概念・機能</th><th>できるようになること</th><th>具体的なメリット</th></tr>
</thead>
<tbody>
<tr><td>メモリファイル（CLAUDE.md）</td><td>プロジェクト固有のルールを自動適用</td><td>毎回同じ指示を繰り返す必要がなくなり、開発効率が上がる</td></tr>
<tr><td>許可リスト設定（settings.json）</td><td>適切な許可設定ができる</td><td>確認プロンプトの削減と安全性を両立</td></tr>
<tr><td>サブエージェント</td><td>責務を分離して専門的なタスクを実行</td><td>レビュー・テスト・セキュリティチェックなどを並行できる</td></tr>
<tr><td>並列処理</td><td>独立したタスクを同時実行</td><td>開発時間が大幅に短縮される</td></tr>
</tbody>
</table>

<h2>環境</h2>
<ul>
<li>OS: MacOS Apple M4 Max Sequoia 15.1</li>
<li>Node.js: v18以上</li>
<li>Claude Code バージョン: 2.0.14</li>
</ul>

<h2>メモリファイル - CLAUDE.md</h2>
<p>「Claude Code」がプロジェクト固有の文脈を理解するために読み込む特別なMarkdownファイル</p>

<h3>メモリファイルの役割</h3>
<p><code>claude</code>と入力し、セッションが開始してから終了するまでの間に指定できる追加のコンテキスト</p>
<p>例えば、AIの応答スタイルとして、「日本語でコミュニケーションを行うこと」であったり、GitHubでコード管理しているプロジェクトであれば、「コミットメッセージはConventional Commitsで生成すること」のような、毎回指示する内容をメモリファイルに含めておくことで、自動的にコンテキストに含めてくれる</p>

<h3>メモリファイルのスコープ</h3>
<table>
<thead>
<tr><th>種類</th><th>場所</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td>プロジェクトメモリ</td><td>./CLAUDE.md または ./.claude/CLAUDE.md</td><td>プロジェクト固有の情報</td></tr>
<tr><td>ユーザーメモリ</td><td>~/.claude/CLAUDE.md</td><td>全プロジェクト共通の個人ルール</td></tr>
</tbody>
</table>

<h2>各種設定 - settings.json</h2>
<p>settings.jsonにより、ツールの権限制御（permissions）、環境変数（env）、フック（hooks）、利用するモデル（model）、MCPサーバー、プラグインなどの設定ができる</p>

<h3>設定ファイルの種類と使い分け</h3>
<table>
<thead>
<tr><th>種類</th><th>場所</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td>プロジェクト設定（個人）</td><td>.claude/settings.local.json</td><td>Gitで管理しない設定</td></tr>
<tr><td>プロジェクト設定（チーム）</td><td>.claude/settings.json</td><td>チームで共有</td></tr>
<tr><td>ユーザー設定</td><td>~/.claude/settings.json</td><td>全プロジェクト共通</td></tr>
</tbody>
</table>

<h3>許可リストの設定例</h3>
<pre><code class="language-json">{
  "permissions": {
    "allow": [
      "Bash(ls:*)",
      "Bash(git:*)",
      "Bash(gh:*)"
    ],
    "deny": [
      "Bash(rm:*)"
    ]
  }
}</code></pre>

<h2>サブエージェント</h2>
<p>単一のエージェントに色々な内容を実行させるのはなく、特定の分野に特化したサブエージェントを複数作成してタスクを実行させることで精度を向上させることができる機能</p>

<h3>サブエージェントのメリット</h3>
<ul>
<li><strong>コンテキストの効率化</strong>：サブエージェントではそれぞれ独立したコンテキストウィンドウを持つ</li>
<li><strong>専門性の向上</strong>：責務の分離</li>
<li><strong>役割と権限を適切に配分</strong>：特定のタスクに特化したエージェントを用意できる</li>
</ul>

<h3>サブエージェントの作成例</h3>
<pre><code class="language-yaml">---
name: code-reviewer
description: コードレビュー専門家
color: orange
tools:
  - Read
  - Edit
  - Glob
  - Grep
model: sonnet
---

# Code Reviewer
あなたは経験豊富なコードレビュアーです。</code></pre>

<h2>プラグイン</h2>
<p>スラッシュコマンド、エージェント、MCPサーバー、フック機能を1つのパッケージとして提供されているもの</p>

<h3>インストール方法</h3>
<pre><code class="language-bash">/plugin marketplace add anthropics/claude-code</code></pre>

<h2>まとめ</h2>
<p>Claude Codeをプロフェッショナルレベルで活用するには、メモリファイルによるコンテキスト管理と適切な権限設定が基盤となる。その上で、サブエージェントによる責務分離、実行モードの使い分け、並列処理を組み合わせることで、開発生産性を最大化できる。</p>`,
    description: "Claude Codeの応用的な機能（メモリファイル、settings.json、サブエージェント、プラグイン）をフル活用し、作業効率と生産性を最大化するための実践ガイド。Maxプランユーザーの経験に基づく解説。",
    category: [getCategory("claude-code")],
  },
  {
    id: "mock-claude-code-intro",
    createdAt: createDate(5),
    updatedAt: createDate(5),
    publishedAt: createDate(5),
    revisedAt: createDate(5),
    title: "Claude Code クラッシュコース【入門編】インストールから基本操作まで",
    eyecatch: {
      url: "https://picsum.photos/seed/claude-code-intro/1200/630",
      width: 1200,
      height: 630,
    },
    content: `<h2>はじめに</h2>
<p>Claude CodeはAnthropicが提供するターミナルベースのAIコーディングアシスタントです。本記事では、インストールから基本的な使い方までを解説します。</p>

<h2>Claude Codeとは</h2>
<p>Claude Codeは、コマンドラインから直接Claudeと対話しながらコーディングできるツールです。以下の特徴があります：</p>
<ul>
<li>ターミナルネイティブな操作感</li>
<li>ファイルの読み書き、コマンド実行が可能</li>
<li>コンテキストを維持した継続的な対話</li>
<li>MCPサーバーとの連携</li>
</ul>

<h2>インストール</h2>
<h3>前提条件</h3>
<ul>
<li>Node.js v18以上</li>
<li>npm または yarn</li>
</ul>

<h3>インストールコマンド</h3>
<pre><code class="language-bash">npm install -g @anthropic-ai/claude-code</code></pre>

<h3>認証設定</h3>
<p>初回起動時にAnthropicアカウントでの認証が必要です：</p>
<pre><code class="language-bash">claude
# ブラウザが開き、認証フローが開始されます</code></pre>

<h2>基本的な使い方</h2>
<h3>セッションの開始</h3>
<pre><code class="language-bash"># プロジェクトディレクトリに移動
cd your-project

# Claude Codeを起動
claude</code></pre>

<h3>よく使うコマンド</h3>
<table>
<thead>
<tr><th>コマンド</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code>/help</code></td><td>ヘルプを表示</td></tr>
<tr><td><code>/clear</code></td><td>コンテキストをクリア</td></tr>
<tr><td><code>/compact</code></td><td>コンテキストを圧縮</td></tr>
<tr><td><code>/cost</code></td><td>現在のセッションのコストを表示</td></tr>
</tbody>
</table>

<h2>実践例：簡単なファイル操作</h2>
<pre><code class="language-text">> このディレクトリの構造を教えて

Claude: プロジェクトの構造を確認します...
[ファイル一覧が表示される]

> README.mdの内容を要約して

Claude: README.mdを読み込んで要約します...
[要約が表示される]</code></pre>

<h2>次のステップ</h2>
<p>入門編を終えたら、<a href="/blog/mock-claude-code-basic">基礎編</a>で以下を学びましょう：</p>
<ul>
<li>効率的なプロンプトの書き方</li>
<li>ファイル編集の基本</li>
<li>Git操作との連携</li>
</ul>`,
    description: "Claude Codeのインストールから基本操作までを解説する入門ガイド。初めてClaude Codeを使う方向けに、環境構築から実践的な使い方まで丁寧に説明します。",
    category: [getCategory("claude-code")],
  },
  {
    id: "mock-claude-code-mcp",
    createdAt: createDate(10),
    updatedAt: createDate(10),
    publishedAt: createDate(10),
    revisedAt: createDate(10),
    title: "Claude CodeでMCPサーバーを活用する方法【実践ガイド】",
    content: `<h2>MCPとは</h2>
<p>Model Context Protocol (MCP) は、AIモデルと外部ツールを連携させるためのオープンプロトコルです。Claude Codeは標準でMCPをサポートしており、様々な外部サービスやツールと連携できます。</p>

<h2>MCPの仕組み</h2>
<pre><code class="language-text">┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Claude Code │ ←→  │ MCP Server  │ ←→  │ External    │
│             │     │             │     │ Service     │
└─────────────┘     └─────────────┘     └─────────────┘</code></pre>

<h2>MCPサーバーの設定</h2>
<h3>設定ファイルの場所</h3>
<p>MCPサーバーの設定は以下のいずれかに記述します：</p>
<ul>
<li><code>.claude/mcp.json</code> - プロジェクト固有の設定</li>
<li><code>~/.claude/mcp.json</code> - グローバル設定</li>
</ul>

<h3>設定例：ファイルシステムMCPサーバー</h3>
<pre><code class="language-json">{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "/path/to/allowed/directory"
      ]
    }
  }
}</code></pre>

<h3>設定例：GitHub MCPサーバー</h3>
<pre><code class="language-json">{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "your-github-token"
      }
    }
  }
}</code></pre>

<h2>よく使うMCPサーバー</h2>
<table>
<thead>
<tr><th>サーバー名</th><th>用途</th><th>提供元</th></tr>
</thead>
<tbody>
<tr><td>filesystem</td><td>ファイル操作の拡張</td><td>Anthropic公式</td></tr>
<tr><td>github</td><td>GitHub API連携</td><td>Anthropic公式</td></tr>
<tr><td>postgres</td><td>PostgreSQLデータベース操作</td><td>Anthropic公式</td></tr>
<tr><td>slack</td><td>Slack連携</td><td>Anthropic公式</td></tr>
</tbody>
</table>

<h2>カスタムMCPサーバーの作成</h2>
<p>独自のMCPサーバーを作成することも可能です：</p>
<pre><code class="language-typescript">import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "my-custom-server",
  version: "1.0.0",
});

// ツールの定義
server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "my_tool",
      description: "カスタムツールの説明",
      inputSchema: {
        type: "object",
        properties: {
          param1: { type: "string" }
        }
      }
    }
  ]
}));

// サーバー起動
const transport = new StdioServerTransport();
await server.connect(transport);</code></pre>

<h2>トラブルシューティング</h2>
<h3>MCPサーバーが認識されない場合</h3>
<ol>
<li>設定ファイルのパスを確認</li>
<li>JSONの構文エラーをチェック</li>
<li><code>/mcp</code>コマンドでサーバー状態を確認</li>
</ol>`,
    description: "Claude CodeでMCPサーバーを設定・活用する方法を解説。ファイルシステム、GitHub、データベースなど様々な外部サービスとの連携方法を実践的に説明します。",
    category: [getCategory("claude-code"), getCategory("model-context-protocol")],
  },

  // MCP (2件)
  {
    id: "mock-mcp-server-tutorial",
    createdAt: createDate(3),
    updatedAt: createDate(3),
    publishedAt: createDate(3),
    revisedAt: createDate(3),
    title: "MCPサーバーの作り方入門【TypeScriptで実装】",
    eyecatch: {
      url: "https://picsum.photos/seed/mcp-server-tutorial/1200/630",
      width: 1200,
      height: 630,
    },
    content: `<h2>はじめに</h2>
<p>Model Context Protocol (MCP) サーバーを自作することで、Claude CodeやClaude Desktopに独自の機能を追加できます。本記事ではTypeScriptを使った基本的なMCPサーバーの実装方法を解説します。</p>

<h2>MCPサーバーとは</h2>
<p>MCPサーバーは、AIモデルに外部ツールへのアクセスを提供するサーバーです。以下の機能を提供できます：</p>
<ul>
<li><strong>Tools</strong>：AIが呼び出せる関数</li>
<li><strong>Resources</strong>：AIが読み取れるデータ</li>
<li><strong>Prompts</strong>：再利用可能なプロンプトテンプレート</li>
</ul>

<h2>プロジェクトのセットアップ</h2>
<pre><code class="language-bash"># プロジェクト作成
mkdir my-mcp-server
cd my-mcp-server
npm init -y

# 依存関係のインストール
npm install @modelcontextprotocol/sdk
npm install -D typescript @types/node</code></pre>

<h3>tsconfig.json</h3>
<pre><code class="language-json">{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "strict": true
  },
  "include": ["src/**/*"]
}</code></pre>

<h2>基本的なサーバー実装</h2>
<pre><code class="language-typescript">// src/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// サーバーインスタンスの作成
const server = new Server(
  {
    name: "my-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ツール一覧の定義
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "hello_world",
      description: "挨拶メッセージを返します",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "挨拶する相手の名前",
          },
        },
        required: ["name"],
      },
    },
  ],
}));

// ツールの実行ハンドラ
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "hello_world") {
    const name = request.params.arguments?.name as string;
    return {
      content: [
        {
          type: "text",
          text: \`こんにちは、\${name}さん！\`,
        },
      ],
    };
  }
  throw new Error(\`Unknown tool: \${request.params.name}\`);
});

// サーバー起動
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch(console.error);</code></pre>

<h2>ビルドと実行</h2>
<pre><code class="language-bash"># ビルド
npx tsc

# 実行テスト
node dist/index.js</code></pre>

<h2>Claude Codeでの設定</h2>
<pre><code class="language-json">// .claude/mcp.json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/path/to/my-mcp-server/dist/index.js"]
    }
  }
}</code></pre>

<h2>実践例：天気情報を取得するMCPサーバー</h2>
<pre><code class="language-typescript">// 天気APIを呼び出すツール
{
  name: "get_weather",
  description: "指定した都市の天気情報を取得します",
  inputSchema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "都市名（例：Tokyo）",
      },
    },
    required: ["city"],
  },
}</code></pre>

<h2>まとめ</h2>
<p>MCPサーバーを自作することで、Claude Codeの機能を無限に拡張できます。基本的な構造を理解したら、実際のユースケースに合わせたサーバーを実装してみてください。</p>`,
    description: "TypeScriptを使ったMCPサーバーの作り方を解説。プロジェクトセットアップから基本的なツール実装、Claude Codeでの設定方法まで、実践的に学べる入門ガイド。",
    category: [getCategory("model-context-protocol")],
  },
  {
    id: "mock-mcp-best-practices",
    createdAt: createDate(8),
    updatedAt: createDate(8),
    publishedAt: createDate(8),
    revisedAt: createDate(8),
    title: "MCPサーバー開発のベストプラクティス",
    content: `<h2>はじめに</h2>
<p>MCPサーバーを実運用で使う際のベストプラクティスをまとめました。セキュリティ、パフォーマンス、保守性の観点から解説します。</p>

<h2>セキュリティ</h2>
<h3>入力値のバリデーション</h3>
<p>ツールに渡される引数は必ずバリデーションを行いましょう：</p>
<pre><code class="language-typescript">import { z } from "zod";

const inputSchema = z.object({
  filePath: z.string().refine(
    (path) => !path.includes(".."),
    "パストラバーサルは許可されていません"
  ),
});</code></pre>

<h3>権限の最小化</h3>
<ul>
<li>必要最小限のファイルシステムアクセス</li>
<li>環境変数での認証情報管理</li>
<li>実行可能なコマンドの制限</li>
</ul>

<h2>エラーハンドリング</h2>
<pre><code class="language-typescript">server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    // ツール実行
    const result = await executeTool(request);
    return { content: [{ type: "text", text: result }] };
  } catch (error) {
    // エラーを適切に返す
    return {
      content: [
        {
          type: "text",
          text: \`エラー: \${error.message}\`,
        },
      ],
      isError: true,
    };
  }
});</code></pre>

<h2>パフォーマンス最適化</h2>
<h3>キャッシュの活用</h3>
<pre><code class="language-typescript">const cache = new Map&lt;string, { data: any; timestamp: number }&gt;();
const CACHE_TTL = 60000; // 1分

async function getCachedData(key: string, fetcher: () => Promise&lt;any&gt;) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  const data = await fetcher();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}</code></pre>

<h2>ログとモニタリング</h2>
<pre><code class="language-typescript">// stderrに出力（stdoutはMCP通信に使用）
function log(level: string, message: string, data?: object) {
  console.error(JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...data,
  }));
}</code></pre>

<h2>テスト</h2>
<pre><code class="language-typescript">import { describe, it, expect } from "vitest";

describe("hello_world tool", () => {
  it("should return greeting message", async () => {
    const result = await callTool("hello_world", { name: "Test" });
    expect(result.content[0].text).toBe("こんにちは、Testさん！");
  });
});</code></pre>`,
    description: "MCPサーバー開発のベストプラクティスを解説。セキュリティ、エラーハンドリング、パフォーマンス最適化、テストなど、実運用で重要なポイントを網羅。",
    category: [getCategory("model-context-protocol")],
  },

  // AI (2件)
  {
    id: "mock-ai-coding-assistants",
    createdAt: createDate(2),
    updatedAt: createDate(2),
    publishedAt: createDate(2),
    revisedAt: createDate(2),
    title: "AIコーディングアシスタント徹底比較【2024年版】Claude Code vs Cursor vs GitHub Copilot",
    eyecatch: {
      url: "https://images.microcms-assets.io/assets/c8f47cd9ef654a2d9ca6b6e579be433f/1c1d87d26bbb4605a331e6fd91792a9f/ChatGPT%20Image%202025%E5%B9%B412%E6%9C%8819%E6%97%A5%2022_25_01.png",
      width: 1536,
      height: 1024,
    },
    content: `<h2>はじめに</h2>
<p>AIコーディングアシスタントが急速に普及しています。本記事では、主要な3つのツール（Claude Code、Cursor、GitHub Copilot）を実際に使い比べた結果をまとめます。</p>

<h2>比較表</h2>
<table>
<thead>
<tr><th>機能</th><th>Claude Code</th><th>Cursor</th><th>GitHub Copilot</th></tr>
</thead>
<tbody>
<tr><td>インターフェース</td><td>ターミナル</td><td>IDE（VS Code fork）</td><td>IDE拡張機能</td></tr>
<tr><td>対話形式</td><td>チャット</td><td>チャット + インライン</td><td>インライン主体</td></tr>
<tr><td>コンテキスト理解</td><td>◎（プロジェクト全体）</td><td>◎（プロジェクト全体）</td><td>○（現在のファイル中心）</td></tr>
<tr><td>ファイル操作</td><td>◎（直接編集可能）</td><td>◎（直接編集可能）</td><td>△（提案のみ）</td></tr>
<tr><td>コマンド実行</td><td>◎</td><td>◎</td><td>×</td></tr>
<tr><td>価格（月額）</td><td>$20〜$200</td><td>$20</td><td>$10〜$19</td></tr>
</tbody>
</table>

<h2>Claude Code</h2>
<h3>特徴</h3>
<ul>
<li>ターミナルネイティブで軽量</li>
<li>MCPによる拡張性</li>
<li>サブエージェントによる並列処理</li>
<li>メモリファイルでコンテキスト管理</li>
</ul>

<h3>向いている人</h3>
<ul>
<li>ターミナル操作に慣れている</li>
<li>複雑なプロジェクト全体を扱う</li>
<li>カスタマイズ性を重視する</li>
</ul>

<h2>Cursor</h2>
<h3>特徴</h3>
<ul>
<li>VS Codeベースで親しみやすい</li>
<li>インラインでの補完が強力</li>
<li>チャットとコードの行き来がスムーズ</li>
</ul>

<h3>向いている人</h3>
<ul>
<li>VS Codeユーザー</li>
<li>GUIでの操作を好む</li>
<li>すぐに使い始めたい</li>
</ul>

<h2>GitHub Copilot</h2>
<h3>特徴</h3>
<ul>
<li>既存のIDEに統合</li>
<li>コード補完が自然</li>
<li>GitHubとの連携が強力</li>
</ul>

<h3>向いている人</h3>
<ul>
<li>既存のIDE環境を変えたくない</li>
<li>コード補完が主目的</li>
<li>GitHubを中心に開発している</li>
</ul>

<h2>使い分けの提案</h2>
<p>私の使い分け方を紹介します：</p>
<ul>
<li><strong>大規模なリファクタリング</strong>：Claude Code（プロジェクト全体を理解して一括変更）</li>
<li><strong>日常的なコーディング</strong>：Cursor（補完とチャットのバランスが良い）</li>
<li><strong>既存プロジェクトへの小さな変更</strong>：GitHub Copilot（軽量で邪魔にならない）</li>
</ul>

<h2>まとめ</h2>
<p>どのツールも一長一短があります。自分の開発スタイルや用途に合わせて選択、または併用することをおすすめします。</p>`,
    description: "Claude Code、Cursor、GitHub Copilotの3大AIコーディングアシスタントを徹底比較。機能、価格、向いている人などを実際の使用経験をもとに解説します。",
    category: [getCategory("ai")],
  },
  {
    id: "mock-ai-code-review",
    createdAt: createDate(12),
    updatedAt: createDate(12),
    publishedAt: createDate(12),
    revisedAt: createDate(12),
    title: "AIを活用したコードレビューの実践ガイド",
    content: `<h2>はじめに</h2>
<p>AIを活用したコードレビューは、人間のレビュアーの負担を軽減しつつ、コード品質を向上させる有効な手段です。本記事では、具体的な活用方法を解説します。</p>

<h2>AIコードレビューのメリット</h2>
<ul>
<li><strong>一貫性</strong>：常に同じ基準でレビュー</li>
<li><strong>即時性</strong>：待ち時間なしでフィードバック</li>
<li><strong>網羅性</strong>：見落としやすいパターンも検出</li>
<li><strong>教育効果</strong>：改善理由の説明付き</li>
</ul>

<h2>Claude Codeでのコードレビュー</h2>
<h3>基本的な使い方</h3>
<pre><code class="language-text">> 最新のコミットをレビューして

Claude: git diffを確認し、以下の点をレビューします：
1. コード品質
2. パフォーマンス
3. セキュリティ
4. ベストプラクティスへの準拠</code></pre>

<h3>サブエージェントの活用</h3>
<p>専用のレビューエージェントを作成すると、より精度の高いレビューが可能です：</p>
<pre><code class="language-yaml">---
name: code-reviewer
description: コードレビュー専門家
model: sonnet
tools:
  - Read
  - Glob
  - Grep
---

# コードレビュー専門家

あなたは10年以上の経験を持つシニアエンジニアです。
以下の観点でコードをレビューしてください：

## チェックリスト
- [ ] 命名規則は適切か
- [ ] 関数の責務は単一か
- [ ] エラーハンドリングは適切か
- [ ] テストは十分か
- [ ] セキュリティ上の問題はないか</code></pre>

<h2>レビュー観点の詳細</h2>
<h3>1. コード品質</h3>
<ul>
<li>可読性（命名、コメント、構造）</li>
<li>保守性（モジュール化、依存関係）</li>
<li>テスタビリティ</li>
</ul>

<h3>2. パフォーマンス</h3>
<ul>
<li>アルゴリズムの効率性</li>
<li>不要なループや再計算</li>
<li>メモリ使用量</li>
</ul>

<h3>3. セキュリティ</h3>
<ul>
<li>入力値のバリデーション</li>
<li>SQLインジェクション</li>
<li>XSS対策</li>
</ul>

<h2>実践例</h2>
<pre><code class="language-typescript">// Before: AIが指摘したコード
function getData(id) {
  const data = db.query(\`SELECT * FROM users WHERE id = \${id}\`);
  return data;
}

// After: AIの提案を反映
function getUserById(userId: string): Promise&lt;User | null&gt; {
  // パラメータ化クエリでSQLインジェクション対策
  const data = await db.query(
    "SELECT * FROM users WHERE id = $1",
    [userId]
  );
  return data[0] ?? null;
}</code></pre>

<h2>まとめ</h2>
<p>AIコードレビューは人間のレビューを完全に置き換えるものではありませんが、ファーストパスとして非常に有効です。人間は、ビジネスロジックや設計判断など、AIが苦手とする領域に集中できます。</p>`,
    description: "AIを活用したコードレビューの実践的な方法を解説。Claude Codeのサブエージェント機能を使った効率的なレビュー手法、チェックリスト、実践例を紹介します。",
    category: [getCategory("ai")],
  },

  // Claude (2件)
  {
    id: "mock-claude-api-guide",
    createdAt: createDate(4),
    updatedAt: createDate(4),
    publishedAt: createDate(4),
    revisedAt: createDate(4),
    title: "Claude API完全ガイド【TypeScript/Python対応】",
    eyecatch: {
      url: "https://picsum.photos/seed/claude-api-guide/1200/630",
      width: 1200,
      height: 630,
    },
    content: `<h2>はじめに</h2>
<p>Claude APIを使えば、自分のアプリケーションにClaudeの機能を組み込むことができます。本記事では、TypeScriptとPythonの両方でAPIを使う方法を解説します。</p>

<h2>APIキーの取得</h2>
<ol>
<li><a href="https://console.anthropic.com">Anthropic Console</a>にアクセス</li>
<li>アカウントを作成またはログイン</li>
<li>API Keysセクションで新しいキーを作成</li>
</ol>

<h2>TypeScriptでの使用</h2>
<h3>インストール</h3>
<pre><code class="language-bash">npm install @anthropic-ai/sdk</code></pre>

<h3>基本的な使い方</h3>
<pre><code class="language-typescript">import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function chat(prompt: string) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      { role: "user", content: prompt }
    ],
  });

  return response.content[0].text;
}</code></pre>

<h3>ストリーミング</h3>
<pre><code class="language-typescript">const stream = await client.messages.stream({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello!" }],
});

for await (const event of stream) {
  if (event.type === "content_block_delta") {
    process.stdout.write(event.delta.text);
  }
}</code></pre>

<h2>Pythonでの使用</h2>
<h3>インストール</h3>
<pre><code class="language-bash">pip install anthropic</code></pre>

<h3>基本的な使い方</h3>
<pre><code class="language-python">import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude!"}
    ]
)

print(message.content[0].text)</code></pre>

<h2>利用可能なモデル</h2>
<table>
<thead>
<tr><th>モデル</th><th>特徴</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td>claude-opus-4-20250514</td><td>最高性能</td><td>複雑なタスク</td></tr>
<tr><td>claude-sonnet-4-20250514</td><td>バランス型</td><td>一般的な用途</td></tr>
<tr><td>claude-3-5-haiku-20241022</td><td>高速・低コスト</td><td>シンプルなタスク</td></tr>
</tbody>
</table>

<h2>ベストプラクティス</h2>
<ul>
<li>APIキーは環境変数で管理</li>
<li>レート制限を考慮した実装</li>
<li>エラーハンドリングの実装</li>
<li>適切なモデルの選択</li>
</ul>`,
    description: "Claude APIの使い方を完全解説。TypeScriptとPythonでの実装方法、ストリーミング、モデル選択のガイドライン、ベストプラクティスを網羅。",
    category: [getCategory("claude")],
  },
  {
    id: "mock-claude-35-sonnet",
    createdAt: createDate(9),
    updatedAt: createDate(9),
    publishedAt: createDate(9),
    revisedAt: createDate(9),
    title: "Claude 3.5 Sonnetの新機能と活用法",
    content: `<h2>Claude 3.5 Sonnetとは</h2>
<p>Claude 3.5 Sonnetは、Anthropicが提供する最新のAIモデルです。前世代と比較して、コーディング能力、推論能力が大幅に向上しています。</p>

<h2>主な改善点</h2>
<h3>1. コーディング能力の向上</h3>
<ul>
<li>複雑なアルゴリズムの実装精度が向上</li>
<li>コードの文脈理解が改善</li>
<li>バグの検出・修正能力が向上</li>
</ul>

<h3>2. 長文処理の改善</h3>
<ul>
<li>200Kトークンのコンテキストウィンドウ</li>
<li>長いコードベースの理解が可能</li>
<li>複数ファイルにまたがる変更にも対応</li>
</ul>

<h3>3. 推論能力の強化</h3>
<ul>
<li>複雑な問題の分解が得意に</li>
<li>ステップバイステップの説明が改善</li>
</ul>

<h2>ベンチマーク結果</h2>
<table>
<thead>
<tr><th>ベンチマーク</th><th>Claude 3 Sonnet</th><th>Claude 3.5 Sonnet</th></tr>
</thead>
<tbody>
<tr><td>HumanEval（コーディング）</td><td>73%</td><td>92%</td></tr>
<tr><td>MMLU（知識）</td><td>79%</td><td>88.7%</td></tr>
<tr><td>MATH（数学）</td><td>51%</td><td>71.1%</td></tr>
</tbody>
</table>

<h2>Claude Codeでの活用</h2>
<p>Claude Codeではデフォルトでclaude-sonnet-4-20250514が使用されます。設定で変更することも可能です：</p>
<pre><code class="language-json">// .claude/settings.json
{
  "model": "claude-sonnet-4-20250514"
}</code></pre>

<h2>実践的な活用シーン</h2>
<h3>リファクタリング</h3>
<pre><code class="language-text">> このファイルをTypeScriptに変換して、
> 型安全性を高めてください

Claude: ファイルを分析し、以下の変換を行います：
1. 型定義の追加
2. any型の排除
3. null安全性の確保
...</code></pre>

<h3>テスト生成</h3>
<pre><code class="language-text">> このコンポーネントのユニットテストを生成して

Claude: コンポーネントを分析し、以下のテストケースを生成します：
1. 正常系のテスト
2. エラーケースのテスト
3. エッジケースのテスト
...</code></pre>`,
    description: "Claude 3.5 Sonnetの新機能と改善点を解説。コーディング能力、長文処理、推論能力の向上、ベンチマーク結果、Claude Codeでの活用法を紹介。",
    category: [getCategory("claude")],
  },

  // Visual Studio Code (2件)
  {
    id: "mock-vscode-extensions",
    createdAt: createDate(6),
    updatedAt: createDate(6),
    publishedAt: createDate(6),
    revisedAt: createDate(6),
    title: "VS Code拡張機能おすすめ15選【2024年版】",
    content: `<h2>はじめに</h2>
<p>VS Codeの拡張機能を厳選して紹介します。開発効率を大幅に向上させる必須級の拡張機能から、あると便利なものまで幅広くカバーします。</p>

<h2>必須級の拡張機能</h2>
<h3>1. ESLint</h3>
<p>JavaScriptとTypeScriptのリンター。コード品質を維持するために必須。</p>
<pre><code class="language-json">// settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}</code></pre>

<h3>2. Prettier</h3>
<p>コードフォーマッター。一貫したコードスタイルを維持。</p>

<h3>3. GitLens</h3>
<p>Git機能の強化。blame、履歴、比較などが便利に。</p>

<h3>4. Error Lens</h3>
<p>エラーをインラインで表示。問題箇所がすぐにわかる。</p>

<h2>AI・コーディング支援</h2>
<h3>5. GitHub Copilot</h3>
<p>AIコード補完の定番。コンテキストに応じた提案。</p>

<h3>6. Claude Dev</h3>
<p>Claude APIを使ったAI支援。チャットでコーディング。</p>

<h2>言語サポート</h2>
<h3>7. TypeScript Importer</h3>
<p>import文の自動補完。モジュールの追加が楽に。</p>

<h3>8. Auto Rename Tag</h3>
<p>HTMLタグの自動リネーム。開始タグを変更すると終了タグも自動変更。</p>

<h2>見た目・UX改善</h2>
<h3>9. Material Icon Theme</h3>
<p>ファイルアイコンが見やすくなる。</p>

<h3>10. Bracket Pair Colorizer</h3>
<p>括弧をカラー表示。ネストが深くても見やすい。</p>

<h2>効率化</h2>
<h3>11. Path Intellisense</h3>
<p>ファイルパスの自動補完。</p>

<h3>12. TODO Highlight</h3>
<p>TODOコメントをハイライト表示。</p>

<h3>13. Live Server</h3>
<p>ローカルサーバーを起動。ホットリロード対応。</p>

<h2>デバッグ・テスト</h2>
<h3>14. Thunder Client</h3>
<p>REST APIクライアント。Postmanの代替。</p>

<h3>15. Jest Runner</h3>
<p>Jestテストの実行・デバッグがエディタ内で完結。</p>

<h2>まとめ</h2>
<p>拡張機能は入れすぎると重くなるので、本当に必要なものだけを厳選して導入しましょう。</p>`,
    description: "VS Codeのおすすめ拡張機能15選。ESLint、Prettier、GitLensなどの必須級から、AI支援、言語サポート、効率化ツールまで幅広く紹介。",
    category: [getCategory("visual-studio-code")],
  },
  {
    id: "mock-vscode-typescript-setup",
    createdAt: createDate(11),
    updatedAt: createDate(11),
    publishedAt: createDate(11),
    revisedAt: createDate(11),
    title: "VS CodeでTypeScript開発環境を構築する完全ガイド",
    content: `<h2>はじめに</h2>
<p>VS CodeでTypeScriptの開発環境を快適に構築する方法を解説します。プロジェクトの初期設定から、効率的な開発フローまでカバーします。</p>

<h2>プロジェクトの初期設定</h2>
<h3>1. Node.jsのインストール</h3>
<pre><code class="language-bash"># nvmを使用する場合
nvm install --lts
nvm use --lts</code></pre>

<h3>2. プロジェクトの作成</h3>
<pre><code class="language-bash">mkdir my-ts-project
cd my-ts-project
npm init -y
npm install -D typescript @types/node</code></pre>

<h3>3. TypeScript設定</h3>
<pre><code class="language-bash">npx tsc --init</code></pre>

<p>tsconfig.jsonの推奨設定：</p>
<pre><code class="language-json">{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}</code></pre>

<h2>VS Codeの設定</h2>
<h3>ワークスペース設定</h3>
<pre><code class="language-json">// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  }
}</code></pre>

<h3>推奨拡張機能</h3>
<pre><code class="language-json">// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next"
  ]
}</code></pre>

<h2>ESLint + Prettierの設定</h2>
<pre><code class="language-bash">npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D prettier eslint-config-prettier</code></pre>

<h3>eslint.config.js</h3>
<pre><code class="language-javascript">import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);</code></pre>

<h2>デバッグ設定</h2>
<pre><code class="language-json">// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug TypeScript",
      "program": "\${workspaceFolder}/src/index.ts",
      "preLaunchTask": "tsc: build",
      "outFiles": ["\${workspaceFolder}/dist/**/*.js"]
    }
  ]
}</code></pre>

<h2>まとめ</h2>
<p>一度環境を整えれば、TypeScript開発が非常に快適になります。チームで開発する場合は、これらの設定をリポジトリに含めて共有しましょう。</p>`,
    description: "VS CodeでTypeScript開発環境を構築する完全ガイド。プロジェクト設定、tsconfig、ESLint、Prettier、デバッグ設定まで詳しく解説。",
    category: [getCategory("visual-studio-code")],
  },

  // Cursor (2件)
  {
    id: "mock-cursor-intro",
    createdAt: createDate(7),
    updatedAt: createDate(7),
    publishedAt: createDate(7),
    revisedAt: createDate(7),
    title: "Cursorエディタ入門ガイド【AIネイティブエディタの使い方】",
    content: `<h2>Cursorとは</h2>
<p>CursorはAI機能を標準搭載したコードエディタです。VS Codeをベースにしており、使い慣れた操作感でAIの恩恵を受けられます。</p>

<h2>特徴</h2>
<ul>
<li>AIチャットとコーディングの融合</li>
<li>コードベース全体を理解したうえでの提案</li>
<li>インライン編集機能</li>
<li>VS Code互換（拡張機能がそのまま使える）</li>
</ul>

<h2>インストール</h2>
<ol>
<li><a href="https://cursor.sh">cursor.sh</a>からダウンロード</li>
<li>インストーラーを実行</li>
<li>VS Codeの設定をインポート（オプション）</li>
</ol>

<h2>基本的な使い方</h2>
<h3>AIチャット（Cmd+L / Ctrl+L）</h3>
<p>サイドパネルでAIと対話。コードの説明、生成、修正を依頼できます。</p>
<pre><code class="language-text">User: この関数の動作を説明して
AI: この関数は...

User: エラーハンドリングを追加して
AI: [コード提案]</code></pre>

<h3>インライン編集（Cmd+K / Ctrl+K）</h3>
<p>コード上で直接AIに指示を出せます。</p>
<ol>
<li>編集したいコードを選択</li>
<li>Cmd+K（Ctrl+K）を押す</li>
<li>指示を入力（例：「TypeScriptに変換」）</li>
<li>提案を確認してAccept/Reject</li>
</ol>

<h3>Tab補完</h3>
<p>通常のコード補完に加え、AIによる予測補完が動作します。</p>

<h2>便利なショートカット</h2>
<table>
<thead>
<tr><th>キー</th><th>機能</th></tr>
</thead>
<tbody>
<tr><td>Cmd+L</td><td>AIチャットを開く</td></tr>
<tr><td>Cmd+K</td><td>インライン編集</td></tr>
<tr><td>Cmd+Shift+L</td><td>選択範囲をチャットに追加</td></tr>
<tr><td>Cmd+I</td><td>Composerを開く</td></tr>
</tbody>
</table>

<h2>設定のカスタマイズ</h2>
<pre><code class="language-json">// settings.json
{
  "cursor.aiModel": "gpt-4",
  "cursor.enableAutoComplete": true,
  "cursor.chat.showSuggestedPrompts": true
}</code></pre>

<h2>Tips</h2>
<ul>
<li>@記法でファイルを参照（@filename.ts）</li>
<li>プロジェクト全体のコンテキストを活用</li>
<li>VS Code拡張機能はほぼそのまま使用可能</li>
</ul>`,
    description: "Cursorエディタの入門ガイド。インストールから基本操作、AIチャット、インライン編集、便利なショートカットまで丁寧に解説。",
    category: [getCategory("cursor")],
  },
  {
    id: "mock-cursor-advanced",
    createdAt: createDate(13),
    updatedAt: createDate(13),
    publishedAt: createDate(13),
    revisedAt: createDate(13),
    title: "CursorのAI機能を使いこなす【上級テクニック】",
    content: `<h2>はじめに</h2>
<p>Cursorの基本を覚えたら、より高度なテクニックを習得しましょう。本記事では、Composerやルールファイルなど、上級者向けの機能を解説します。</p>

<h2>Composer機能</h2>
<p>複数ファイルにまたがる変更を一括で行える強力な機能です。</p>

<h3>使い方</h3>
<ol>
<li>Cmd+I（Ctrl+I）でComposerを開く</li>
<li>実現したいことを自然言語で説明</li>
<li>AIが複数ファイルの変更案を提示</li>
<li>差分を確認してApply</li>
</ol>

<h3>効果的なプロンプト例</h3>
<pre><code class="language-text">「UserコンポーネントをReact Hooksに書き換えて、
関連するテストファイルも更新してください」

「APIエンドポイントに認証ミドルウェアを追加して、
すべてのルートで使用されるようにしてください」</code></pre>

<h2>.cursorrulesファイル</h2>
<p>プロジェクトごとにAIの動作をカスタマイズできます。</p>

<pre><code class="language-text"># .cursorrules

You are an expert TypeScript developer.

## Code Style
- Use functional components with hooks
- Prefer const over let
- Always add explicit return types

## Project Context
- This is a Next.js 14 project with App Router
- We use Tailwind CSS for styling
- State management: Zustand

## Conventions
- File naming: kebab-case
- Component naming: PascalCase
- Test files: *.test.ts</code></pre>

<h2>@記法の活用</h2>
<table>
<thead>
<tr><th>記法</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>@filename</td><td>特定のファイルを参照</td></tr>
<tr><td>@folder</td><td>フォルダ全体を参照</td></tr>
<tr><td>@codebase</td><td>プロジェクト全体を参照</td></tr>
<tr><td>@web</td><td>Webを検索</td></tr>
<tr><td>@docs</td><td>ドキュメントを参照</td></tr>
</tbody>
</table>

<h2>モデルの使い分け</h2>
<ul>
<li><strong>GPT-4</strong>：複雑なタスク、長いコンテキスト</li>
<li><strong>Claude</strong>：コード生成、リファクタリング</li>
<li><strong>GPT-3.5</strong>：シンプルなタスク（コスト節約）</li>
</ul>

<h2>実践Tips</h2>
<h3>段階的なアプローチ</h3>
<ol>
<li>まず計画を立ててもらう</li>
<li>計画をレビュー・調整</li>
<li>実装を依頼</li>
</ol>

<h3>コンテキストの管理</h3>
<ul>
<li>関連ファイルを明示的に追加</li>
<li>不要なファイルは除外</li>
<li>長い会話は新しいチャットで</li>
</ul>

<h2>まとめ</h2>
<p>Cursorを使いこなすには、AIとの効果的なコミュニケーションが鍵です。.cursorrulesで文脈を共有し、適切なモデルを選択することで、開発効率を最大化できます。</p>`,
    description: "CursorのAI機能を最大限に活用する上級テクニック。Composer、.cursorrules、@記法、モデルの使い分けなど、効率的な開発フローを解説。",
    category: [getCategory("cursor")],
  },

  // Python (2件)
  {
    id: "mock-python-ai-app",
    createdAt: createDate(14),
    updatedAt: createDate(14),
    publishedAt: createDate(14),
    revisedAt: createDate(14),
    title: "PythonでAIアプリを作る【Claude API + Streamlit】",
    eyecatch: {
      url: "https://picsum.photos/seed/python-ai-app/1200/630",
      width: 1200,
      height: 630,
    },
    content: `<h2>はじめに</h2>
<p>PythonとClaude APIを使って、簡単なAIチャットアプリを作成します。UIにはStreamlitを使用し、最小限のコードで動くアプリを構築します。</p>

<h2>環境構築</h2>
<h3>必要なもの</h3>
<ul>
<li>Python 3.9以上</li>
<li>Anthropic APIキー</li>
</ul>

<h3>セットアップ</h3>
<pre><code class="language-bash"># 仮想環境の作成
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate

# パッケージのインストール
pip install anthropic streamlit python-dotenv</code></pre>

<h3>環境変数の設定</h3>
<pre><code class="language-bash"># .env
ANTHROPIC_API_KEY=your-api-key-here</code></pre>

<h2>基本的なチャットアプリ</h2>
<pre><code class="language-python"># app.py
import streamlit as st
import anthropic
from dotenv import load_dotenv

load_dotenv()

st.title("Claude Chat App")

# セッション状態の初期化
if "messages" not in st.session_state:
    st.session_state.messages = []

# 過去のメッセージを表示
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# ユーザー入力
if prompt := st.chat_input("メッセージを入力"):
    # ユーザーメッセージを追加
    st.session_state.messages.append({
        "role": "user",
        "content": prompt
    })
    with st.chat_message("user"):
        st.markdown(prompt)

    # Claude APIを呼び出し
    client = anthropic.Anthropic()
    with st.chat_message("assistant"):
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            messages=st.session_state.messages
        )
        assistant_message = response.content[0].text
        st.markdown(assistant_message)

    # アシスタントの応答を保存
    st.session_state.messages.append({
        "role": "assistant",
        "content": assistant_message
    })</code></pre>

<h2>起動方法</h2>
<pre><code class="language-bash">streamlit run app.py</code></pre>

<h2>機能拡張：ストリーミング対応</h2>
<pre><code class="language-python"># ストリーミングでリアルタイム表示
with st.chat_message("assistant"):
    message_placeholder = st.empty()
    full_response = ""

    with client.messages.stream(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=st.session_state.messages
    ) as stream:
        for text in stream.text_stream:
            full_response += text
            message_placeholder.markdown(full_response + "▌")

    message_placeholder.markdown(full_response)</code></pre>

<h2>デプロイ</h2>
<p>Streamlit Cloudを使えば簡単にデプロイできます：</p>
<ol>
<li>GitHubにリポジトリを作成</li>
<li>Streamlit Cloudにサインアップ</li>
<li>リポジトリを接続</li>
<li>Secretsに環境変数を設定</li>
</ol>

<h2>まとめ</h2>
<p>PythonとClaude APIを使えば、数十行のコードでAIチャットアプリが作成できます。Streamlitを使うことで、UIの実装も最小限で済みます。</p>`,
    description: "PythonとClaude APIを使ったAIチャットアプリの作り方。Streamlitを使った簡単なUI構築から、ストリーミング対応、デプロイまで解説。",
    category: [getCategory("python")],
    youtube_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "mock-python-fastapi",
    createdAt: createDate(15),
    updatedAt: createDate(15),
    publishedAt: createDate(15),
    revisedAt: createDate(15),
    title: "FastAPIでREST APIを構築する【完全ガイド】",
    content: `<h2>FastAPIとは</h2>
<p>FastAPIは、Pythonで高速なAPIを構築するためのモダンなWebフレームワークです。型ヒントを活用した自動バリデーション、OpenAPI自動生成が特徴です。</p>

<h2>特徴</h2>
<ul>
<li><strong>高速</strong>：NodeJSやGoに匹敵するパフォーマンス</li>
<li><strong>型安全</strong>：Pydanticによる自動バリデーション</li>
<li><strong>自動ドキュメント</strong>：Swagger UI、ReDoc</li>
<li><strong>非同期対応</strong>：async/awaitをネイティブサポート</li>
</ul>

<h2>プロジェクトセットアップ</h2>
<pre><code class="language-bash">mkdir fastapi-project
cd fastapi-project
python -m venv venv
source venv/bin/activate

pip install fastapi uvicorn pydantic</code></pre>

<h2>基本的なAPI</h2>
<pre><code class="language-python"># main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="My API", version="1.0.0")

# モデル定義
class User(BaseModel):
    id: int
    name: str
    email: str

class UserCreate(BaseModel):
    name: str
    email: str

# インメモリDB（デモ用）
users_db: dict[int, User] = {}

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/users", response_model=list[User])
async def get_users():
    return list(users_db.values())

@app.get("/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    return users_db[user_id]

@app.post("/users", response_model=User)
async def create_user(user: UserCreate):
    user_id = len(users_db) + 1
    new_user = User(id=user_id, **user.model_dump())
    users_db[user_id] = new_user
    return new_user</code></pre>

<h2>起動</h2>
<pre><code class="language-bash">uvicorn main:app --reload</code></pre>

<p>自動ドキュメントにアクセス：</p>
<ul>
<li>Swagger UI: http://localhost:8000/docs</li>
<li>ReDoc: http://localhost:8000/redoc</li>
</ul>

<h2>依存性注入</h2>
<pre><code class="language-python">from fastapi import Depends

async def get_db():
    # データベース接続を取得
    db = Database()
    try:
        yield db
    finally:
        await db.close()

@app.get("/items")
async def get_items(db = Depends(get_db)):
    return await db.get_items()</code></pre>

<h2>認証の追加</h2>
<pre><code class="language-python">from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

async def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    # トークンを検証
    if not is_valid_token(token):
        raise HTTPException(status_code=401, detail="Invalid token")
    return token

@app.get("/protected")
async def protected_route(token: str = Depends(verify_token)):
    return {"message": "Authenticated!"}</code></pre>

<h2>テスト</h2>
<pre><code class="language-python"># test_main.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

def test_create_user():
    response = client.post(
        "/users",
        json={"name": "Test", "email": "test@example.com"}
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Test"</code></pre>

<h2>まとめ</h2>
<p>FastAPIは、モダンなPython APIを構築するための強力なツールです。型ヒントを活用することで、安全で保守性の高いコードが書けます。</p>`,
    description: "FastAPIを使ったREST API構築の完全ガイド。プロジェクトセットアップ、CRUD操作、依存性注入、認証、テストまで実践的に解説。",
    category: [getCategory("python")],
  },
];

// more_readings の設定（記事間の相互参照）
const getArticleById = (id: string) => mockArticles.find((a) => a.id === id);

// Claude Code応用編 → 入門編とMCP記事を参照
const crashCourse = getArticleById("mock-claude-code-crash-course");
if (crashCourse) {
  crashCourse.more_readings = [
    getArticleById("mock-claude-code-intro"),
    getArticleById("mock-claude-code-mcp"),
  ].filter((a): a is Article => a !== undefined);
}

// MCP入門 → MCPベストプラクティスとClaude Code MCP記事を参照
const mcpTutorial = getArticleById("mock-mcp-server-tutorial");
if (mcpTutorial) {
  mcpTutorial.more_readings = [
    getArticleById("mock-mcp-best-practices"),
    getArticleById("mock-claude-code-mcp"),
  ].filter((a): a is Article => a !== undefined);
}

// AIコーディングアシスタント比較 → Claude Code入門とCursor入門を参照
const aiCodingAssistants = getArticleById("mock-ai-coding-assistants");
if (aiCodingAssistants) {
  aiCodingAssistants.more_readings = [
    getArticleById("mock-claude-code-intro"),
    getArticleById("mock-cursor-intro"),
  ].filter((a): a is Article => a !== undefined);
}

// 公開日の新しい順にソート
export const sortedMockArticles = [...mockArticles].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);
