# ビルドログ改善計画

## 概要
Vercelビルドログの分析結果に基づく改善計画。重要度順に対応。

---

## 1. `console.log(youtube_link)` の削除（重要度: 高）
- **ファイル**: `src/layouts/BlogDetailLayout.astro:33`
- **問題**: 全ブログ記事のビルド時に `youtube_link` が無条件で出力。未設定記事では `undefined` が大量出力される
- **対応**: デバッグ用の `console.log` を削除
- **ステータス**: [x] 完了

## 2. LinkCard OGPフェッチのエラーログ改善（重要度: 中）
- **ファイル**: `src/libs/linkCard.ts`
- **問題**: OGP取得失敗時にエラーオブジェクト全体を出力。ビルドログが数百行のスタックトレースで埋まる
- **対応**: `console.error` → `console.warn` に変更し、URLとエラーメッセージのみの1行出力に変更
- **ステータス**: [x] 完了

## 3. npm脆弱性の対応（重要度: 高）
- **問題**: 19件の脆弱性（High: 9, Moderate: 7, Low: 3）
- **対応**: `npm audit fix` で安全に修正（19件 → 8件に削減）
- **残り8件**: vitest (v0.33→v4) と @astrojs/vercel のメジャーアップグレードが必要（破壊的変更あり、別途対応推奨）
- **ステータス**: [x] 完了（安全な範囲）

## 4. microCMSコンテンツの修正が必要な項目（手動対応）

### 4-1. 内部リンク切れ（404）
以下のURLが他記事から参照されているが、404を返す。microCMSで該当記事のリンクカードを修正する必要がある：
- `https://maasaablog.com/blog/vrcsnc7okc3/` → 参照元: agent-skills系の複数記事
- `https://maasaablog.com/blog/tj8yttqivk/` → 参照元: agent-skills系の複数記事
- `https://maasaablog.com/blog/gmn5nf9-0a/` → 参照元: claude-code系の複数記事
- `https://claudecodemarketplace.com/marketplace/anthropics/claude-code` → 参照元: v7aq6fv9x, コースlesson 3

### 4-2. YouTube Studio URL の混入（情報漏洩リスク）
以下の記事にYouTube Studioの編集URL（非公開URL）が設定されている。microCMSで公開URLに修正する必要がある：
- `/blog/uncpy53srea/` → `studio.youtube.com/.../edit` → 正: `https://www.youtube.com/watch?v=cgyQwHhJ7Hw`
- `/blog/l45cnqexija/` → `studio.youtube.com/.../edit` → 正: `https://www.youtube.com/watch?v=B7lgaXAbuo0`

### 4-3. 外部サイト403エラー（OGPスクレイピングがブロック）
- `https://skillsmp.com/` → 403 Forbidden
- `https://claude.ai/` → 403 Forbidden
→ リンクカードはフォールバック表示になる。URL自体は正しいので実害は少ない

---

## 完了チェックリスト
- [x] 1. console.log削除
- [x] 2. LinkCardエラーログ改善
- [x] 3. npm audit fix（安全な範囲）
- [ ] 4-1. microCMS: 内部リンク切れ修正（手動）
- [ ] 4-2. microCMS: YouTube Studio URL修正（手動）
- [ ] 4-3. 外部403エラー対応（優先度低）
- [ ] 5. vitest メジャーアップグレード（別タスクで対応推奨）
- [ ] 6. @astrojs/vercel メジャーアップグレード（別タスクで対応推奨）
