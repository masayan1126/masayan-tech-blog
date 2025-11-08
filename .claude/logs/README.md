# Code Changes Log

このディレクトリには、このプロジェクトでのコード変更履歴が記録されます。

## ログファイル

- **CHANGELOG.md**: すべてのコード変更履歴（読みやすい形式）

## CHANGELOG.md

日付ごとに整理された、読みやすい変更履歴です。各エントリには以下の情報が含まれます：

- 📝 Updated - ファイルを更新
- ✨ Created - 新規ファイルを作成
- ✏️ Edited - コードを編集
- 📓 Notebook - Notebookセルを編集

### 表示内容
- タイムスタンプ（時刻まで記録）
- 変更内容の概要
- ファイルパス（プロジェクトルートからの相対パス）
- 変更の詳細（短い場合のみ）

## ログの確認方法

```bash
# 最新の変更履歴を確認
tail -50 .claude/logs/CHANGELOG.md

# 今日の変更を確認
grep "$(date '+%Y年%m月%d日')" .claude/logs/CHANGELOG.md

# 特定のファイルの変更履歴を確認
grep "src/components/Button.tsx" .claude/logs/CHANGELOG.md
```

## フックの設定

このログ機能は `.claude/settings.local.json` の `PostToolUse` フックで設定されています。

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write|NotebookEdit",
        "hooks": [
          {
            "type": "command",
            "command": "./.claude/hooks/log-code-changes.sh"
          }
        ]
      }
    ]
  }
}
```

## .gitignore への追加

ログファイルは個人的な作業履歴なので、通常は `.gitignore` に追加することをお勧めします：

```
.claude/logs/
```
