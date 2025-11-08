#!/bin/bash

# コード変更のchangelogを記録するスクリプト（プロジェクトローカル版）

# 標準入力からJSONを読み取る
INPUT=$(cat)

# プロジェクトルートのログディレクトリ
PROJECT_ROOT="/Users/masayan/git/masayan-tech-blog"
LOG_DIR="$PROJECT_ROOT/.claude/logs"
CHANGELOG_FILE="$LOG_DIR/CHANGELOG.md"

# ログディレクトリが存在しない場合は作成
mkdir -p "$LOG_DIR"

# タイムスタンプを取得
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
DATE_HEADER=$(date '+%Y年%m月%d日')

# tool_nameを取得
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // "unknown"')

# tool_inputを取得
TOOL_INPUT=$(echo "$INPUT" | jq -r '.tool_input // "{}"')

# file_pathを取得（Edit, Write, NotebookEditの場合）
FILE_PATH=$(echo "$TOOL_INPUT" | jq -r '.file_path // .notebook_path // "N/A"')

# 変更内容を取得
OLD_STRING=$(echo "$TOOL_INPUT" | jq -r '.old_string // ""')
NEW_STRING=$(echo "$TOOL_INPUT" | jq -r '.new_string // ""')
REPLACE_ALL=$(echo "$TOOL_INPUT" | jq -r '.replace_all // false')

# changelogに記録すべきツールかチェック
if [[ "$TOOL_NAME" != "Write" ]] && [[ "$TOOL_NAME" != "Edit" ]] && [[ "$TOOL_NAME" != "NotebookEdit" ]]; then
    exit 0
fi

# .claude配下のファイルは除外（無限ループ防止）
if [[ "$FILE_PATH" == *"/.claude/"* ]]; then
    exit 0
fi

# プロジェクト外のファイルは除外
if [[ "$FILE_PATH" != "$PROJECT_ROOT"* ]]; then
    exit 0
fi

# changelogファイルが存在しない場合は初期化
if [[ ! -f "$CHANGELOG_FILE" ]]; then
    cat > "$CHANGELOG_FILE" << 'EOF'
# Code Changes Log

このファイルには、Claude Codeによるコード変更の履歴が記録されます。

---

EOF
fi

# 今日の日付のヘッダーが存在しない場合は追加
if ! grep -q "^## $DATE_HEADER" "$CHANGELOG_FILE" 2>/dev/null; then
    echo -e "\n## $DATE_HEADER\n" >> "$CHANGELOG_FILE"
fi

# 変更の種類を判定
CHANGE_TYPE=""
CHANGE_SUMMARY=""

if [[ "$TOOL_NAME" == "Write" ]]; then
    # ファイルが新規作成か上書きかを判定
    if [[ -f "$FILE_PATH" ]]; then
        CHANGE_TYPE="📝 Updated"
        CHANGE_SUMMARY="ファイルを更新"
    else
        CHANGE_TYPE="✨ Created"
        CHANGE_SUMMARY="新規ファイルを作成"
    fi
elif [[ "$TOOL_NAME" == "Edit" ]]; then
    CHANGE_TYPE="✏️ Edited"

    # 変更内容から概要を推測
    if [[ -z "$OLD_STRING" ]] && [[ -n "$NEW_STRING" ]]; then
        CHANGE_SUMMARY="コードを追加"
    elif [[ -n "$OLD_STRING" ]] && [[ -z "$NEW_STRING" ]]; then
        CHANGE_SUMMARY="コードを削除"
    else
        # 具体的な変更内容を検出
        if echo "$OLD_STRING" | grep -q "console\." && ! echo "$NEW_STRING" | grep -q "console\."; then
            CHANGE_SUMMARY="console.logを削除"
        elif echo "$NEW_STRING" | grep -q "import "; then
            CHANGE_SUMMARY="import文を修正"
        elif echo "$NEW_STRING" | grep -q "function\|const.*=.*=>"; then
            CHANGE_SUMMARY="関数を修正"
        elif echo "$NEW_STRING" | grep -q "class "; then
            CHANGE_SUMMARY="クラスを修正"
        else
            CHANGE_SUMMARY="コードを修正"
        fi
    fi

    if [[ "$REPLACE_ALL" == "true" ]]; then
        CHANGE_SUMMARY="${CHANGE_SUMMARY}（全置換）"
    fi
elif [[ "$TOOL_NAME" == "NotebookEdit" ]]; then
    CHANGE_TYPE="📓 Notebook"
    CHANGE_SUMMARY="Notebookセルを編集"
fi

# ファイル名を取得（パスから）
FILE_NAME=$(basename "$FILE_PATH")

# プロジェクトルートからの相対パスを取得
RELATIVE_PATH="${FILE_PATH#$PROJECT_ROOT/}"

# ログエントリを追加
{
    echo "### $CHANGE_TYPE \`$FILE_NAME\` - $TIMESTAMP"
    echo ""
    echo "**変更内容**: $CHANGE_SUMMARY"
    echo ""
    echo "**ファイルパス**: \`$RELATIVE_PATH\`"
    echo ""

    if [[ "$TOOL_NAME" == "Edit" ]] && [[ -n "$OLD_STRING" ]] && [[ -n "$NEW_STRING" ]]; then
        # 差分が長すぎる場合は省略
        OLD_LENGTH=${#OLD_STRING}
        NEW_LENGTH=${#NEW_STRING}

        if [[ $OLD_LENGTH -lt 300 ]] && [[ $NEW_LENGTH -lt 300 ]]; then
            echo "<details>"
            echo "<summary>変更の詳細を表示</summary>"
            echo ""
            echo "**変更前**:"
            echo '```'
            echo "$OLD_STRING"
            echo '```'
            echo ""
            echo "**変更後**:"
            echo '```'
            echo "$NEW_STRING"
            echo '```'
            echo "</details>"
            echo ""
        else
            echo "_※ 変更内容が大きいため省略_"
            echo ""
        fi
    fi

    echo "---"
    echo ""
} >> "$CHANGELOG_FILE"

# 成功を示す終了コード
exit 0
