# CLAUDE.md

## WHY: このプロジェクトについて

AI・テック情報を発信するテックブログ（https://maasaablog.com/）のソースコード。
Astro + microCMS構成で、高速で読みやすいブログ体験を提供する。

**対象者**: AI・テック情報を求める読者、およびブログを開発・運用する開発者
**言語**: 日本語（コンテンツ）、TypeScript（コード）

## WHAT: 含まれるもの

### 技術スタック

| 技術 | 用途 |
|------|------|
| Astro | 静的サイトジェネレータ |
| React | インタラクティブコンポーネント |
| microCMS | ヘッドレスCMS（コンテンツ管理） |
| Tailwind CSS | スタイリング |
| Vercel | ホスティング |

### スキル

| スキル名 | 概要 |
|---------|------|
| frontend-optimizer | フロントエンド改善を総合支援（パフォーマンス、UX、SEO） |

> 詳細は `.claude/skills/frontend-optimizer/SKILL.md` を参照

### 主要ディレクトリ

```
src/
├── pages/          # ページルーティング
├── components/     # UIコンポーネント
├── layouts/        # レイアウトテンプレート
├── libs/           # microCMS連携など外部サービス
├── utils/          # ユーティリティ関数
└── styles/         # グローバルスタイル
```

## HOW: 開発方法

### コマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド
npm run test     # テスト実行
```

### 環境変数

`.env` に microCMS の API キーを設定（`.env.example` 参照）

### コミット・変更ログ

- コード変更時は `.claude/hooks/log-code-changes.sh` により自動記録
- 変更履歴は `.claude/logs/CHANGELOG.md` に蓄積
