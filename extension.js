const vscode = require("vscode");

const _supportedLanguages = {
    javascript: {
        name: 'javascript',
        singleLineCommentDetectingRegex: /\/\/.*$/gm,         /* the text from any '//' to the next newline or EOF */
        multiLineCommentDetectingRegex: /\/\*(.*?)\*\//gs     /* the text between these things I'm using to comment. Some bugs, but good enough. */
    },
    typescript: {
        name: 'typescript',
        singleLineCommentDetectingRegex: /\/\/.*$/gm,         /* the text from any '//' to the next newline or EOF */
        multiLineCommentDetectingRegex: /\/\*(.*?)\*\//gs     /* the text between these things I'm using to comment. Some bugs, but good enough. */
    },
    python: {
        name: 'python',
        singleLineCommentDetectingRegex: /(?<!['"])(#.*$)/gm, /* the text from any # to the next newline or EOF (ignores if preceded by a quote) */
        multiLineCommentDetectingRegex: /"""([\s\S]*?)"""/g   /* the text between any sets of """. Using lazy matching, some bugs if unterminated. */
    },
    csharp: {
        name: 'csharp',
        singleLineCommentDetectingRegex: /\/\/.*$/gm,         /* the text from any '//' to the next newline or EOF */
        multiLineCommentDetectingRegex: /\/\*(.*?)\*\//gs     /* the text between these things I'm using to comment. Some bugs, but good enough. */
    },
};

const _utilityRegex = {
    duplicateBlankLineRegex: /([ \t]*\n){3,}/g,  /* any blanks that extend past 1 line */
    startOfFileBlankLineRegex: /(^[\s\r\n]+)|/g, /* any blank stuff at start of file */
}

function _cleanDuplicateBlankLines(text) {
    let newText = text.replace(_utilityRegex.duplicateBlankLineRegex, '\n\n');
    newText = newText.replace(_utilityRegex.startOfFileBlankLineRegex, '')
    return newText;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand("comment-annihilator-3000.removeComments", function () {

        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showWarningMessage("No active text editor found. Open a file first.");
            return;
        }

        const document = editor.document;
        const languageId = document.languageId;
        const activeLanguage = _supportedLanguages[languageId];

        if (!activeLanguage) {
            vscode.window.showWarningMessage(`Sorry, language "${languageId}" is not supported for this operation.`);
            return;
        }

        editor.edit((editBuilder) => {

            const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length));

            const originalText = document.getText();

            let newText = originalText;

            newText = newText.replace(activeLanguage.singleLineCommentDetectingRegex, "");
            newText = newText.replace(activeLanguage.multiLineCommentDetectingRegex, "");
            newText = _cleanDuplicateBlankLines(newText);

            editBuilder.replace(fullRange, newText);
        });

        vscode.window.showInformationMessage(
            "Single-line comments annihilated (and blank lines cleaned)!"
        );
    });
    context.subscriptions.push(disposable);
}

function deactivate() { /* do nothing on deactivate */ }

module.exports = {
    activate,
    deactivate,
};
