# 技術ブログ

## 🎨 テーマカラー

このサイトのカラーテーマは以下のように定義されています：

| 種類 | カラー | HEXコード | 用途 |
|------|--------|-----------|------|
| **プライマリカラー** | 🟨 黄色 | `#F3BC45` | メインテーマカラー（リンク、ホバー、ボーダーなど） |
| **セカンダリカラー** | 🟩 緑色 | `#60823E` | サブテーマカラー（コードブロック、引用など） |

### カラー定数の使用

テーマカラーは `src/constants/colors.ts` で一元管理されています。

```typescript
import { PRIMARY_COLOR, SECONDARY_COLOR, THEME_COLORS } from '@/constants/colors';

// 使用例
const color = PRIMARY_COLOR.hex; // '#F3BC45'
const rgba = PRIMARY_COLOR.rgba(0.5); // 'rgba(243, 188, 69, 0.5)'
```

詳細は [src/constants/README.md](./src/constants/README.md) を参照してください。

## 🚀 Project Structure

layout以外はfeaturesディレクトリとそれ以外にドメイン(機能単位で)分割

```
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```


## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
