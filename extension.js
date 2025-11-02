// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    console.log('Congratulations, "comment-annihilator-3000" is now active!');

    // 1. Register the command and link it to the core removal function.
    let disposable = vscode.commands.registerCommand('comment-annihilator-3000.removeComments', function () {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            
            // Start editing the document. All changes must be made within an editor.edit call.
            editor.edit(editBuilder => {
                const fullRange = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(document.getText().length)
                );
                
                // Get the entire text of the document
                const originalText = document.getText();

                // === TWO-STEP LOGIC FOR PRECISE LINE MANAGEMENT ===
                let newText = originalText;

                // Step 1: Remove full-line comments (including leading whitespace and trailing newline)
                // This targets lines that contain ONLY a comment (and optional indentation).
                // Example: '  // comment here\n' -> ''
                // We exclude the newline character (\r?\n) if it's the very last thing in the file.
                // Regex: /^[ \t]*\/\/[^\r\n]*\r?\n/gm
                newText = newText.replace(/^[ \t]*\/\/[^\r\n]*\r?\n/gm, '');
                
                // Step 2: Remove inline comments and any preceding whitespace.
                // This handles comments that follow code, ensuring URL safety.
                // The regex captures the last character of the code line (like ; or }) in group $1
                // and replaces the entire match (whitespace + // + comment) with just that character.
                // Regex: /[ \t]*([^:])\/\/.*$/gm
                // Example: 'var x = 1; // comment' -> 'var x = 1;' (where $1 is ';')
                newText = newText.replace(/[ \t]*([^:])\/\/.*$/gm, '$1');
                
                // Final safety cleanup: If the file ended with a comment, the above leaves the comment content
                // as the last line. This final step removes any remaining full-line comments at EOF.
                newText = newText.replace(/^[ \t]*\/\/.*$/gm, '');


                // Replace the entire document content with the new, comment-free text.
                editBuilder.replace(fullRange, newText);
            });
            
            vscode.window.showInformationMessage('Single-line comments annihilated (and blank lines cleaned)!');

        } else {
            vscode.window.showWarningMessage('No active text editor found. Open a file first.');
        }
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}
