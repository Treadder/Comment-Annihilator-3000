## 💥 Comment Annihilator 3000 💥

This extension provides a powerful, single-command utility to aggressively remove **single-line** and **multi-line** comments from your active file, followed by blank line cleanup.

---

### ✨ Features & Supported Languages

- **Fast and Local:** Comment Annihilator 3000 uses fast regex logic to find and remove comments across the entire document.
- **Aggressive Removal:** Comments are replaced with an **empty string**.
- **Blank Line Cleanup:** After comment removal, all occurrences of **two or more consecutive blank lines** are condensed down to one, and any blank lines at the start of the file are removed.

| Language       | Single-Line Supported | Multi-Line Supported | Notes                                                                 |
| :------------- | :-------------------- | :------------------- | :-------------------------------------------------------------------- |
| **JavaScript** | ✅                    | ✅                   | Expects multiline comments to be terminated. Might break URL strings. |
| **TypeScript** | ✅                    | ✅                   | Expects multiline comments to be terminated. Might break URL strings. |
| **C#**         | ✅                    | ✅                   | Expects multiline comments to be terminated. Might break URL strings. |
| **Python**     | ✅                    | ✅                   | Expects multiline comments to be terminated.                          |
| **HTML**       | ❌                    | ❌                   | Not supported, Coming soon                                            |
| **React**      | ✅ / ❌               | ✅ / ❌              | Untested, coming soon                                                 |
| **Vue**        | ✅ / ❌               | ✅ / ❌              | Untested, coming soon                                                 |

---

### 🚀 Usage

1.  Open the file you wish to clean.
2.  Open the **Command Palette** (`Ctrl+Shift+P` or `Cmd+Shift+P`).
3.  Search for: `Annihilate Comments`
4.  Execute the command. Your file is instantly cleaned!
5.  Pro tip: if you use the command a lot, it's as fast as `Ctrl+Shift+P+Enter` as your most-used commands are automaticall suggested by VS Code.

### Limitations

1.  **Multiline Comment Formatting:** Expects your multiline comments to be formatted properly. If you have an unterminated `/*` (or `"""`) in a file, you might get wonky results when running this.
2.  **String wierdness:** There's bound to be edge cases with URL strings, etc. Feel free to open a PR or email me if you find a bug!

---

### Resources

1.  https://regexr.com/ was super helpful for working on the logic for this thing
