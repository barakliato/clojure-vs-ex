'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let terminal = vscode.window.createTerminal("clojure");
    terminal.sendText("lein repl");
    const clojure = { repl: terminal };
    terminal.show();

    function readNamespace() {
        let editor = vscode.window.activeTextEditor;
        if(!editor) 
            return;
        
        for(let i = 0; i < editor.document.lineCount; i++) {
            let line = editor.document.lineAt(0);
            if(!line.isEmptyOrWhitespace) {
                let firstCharacter = line.firstNonWhitespaceCharacterIndex.toString();
                if(firstCharacter === ";")
                    continue;
                
                let text = line.text.trim();
                if(!text.startsWith("(ns "))
                    return;

                let endOfNamespaceIndex = text.indexOf(" ", 4);
                if(endOfNamespaceIndex === -1)
                    endOfNamespaceIndex = text.indexOf(")", 4);

                return endOfNamespaceIndex === -1
                        ? text.substring(4)
                        : text.substring(4, endOfNamespaceIndex);
            }
        }
    }

    const clojureStart = vscode.commands.registerCommand('clojure.start', () => {

        clojure.repl = vscode.window.createTerminal("clojure");
        clojure.repl.sendText("lein repl");
        clojure.repl.show();
    });

    const printCurrentNamespace = vscode.commands.registerCommand('clojure.namespace.print', () => {

        clojure.repl.sendText("(ns-name *ns*)");
        clojure.repl.show();
    });

    const loadClojureFile = vscode.commands.registerCommand('clojure.namespace.load', () => {

        let namespace = readNamespace();
        if(namespace)
            clojure.repl.sendText(`(require '${namespace})`);
    });

    const moveClojureNamespace = vscode.commands.registerCommand('clojure.namespace.move', () => {
        
        let namespace = readNamespace();
        if(namespace)
            clojure.repl.sendText(`(in-ns '${namespace})`);
    });

    context.subscriptions.push(clojureStart);
    context.subscriptions.push(printCurrentNamespace);
    context.subscriptions.push(loadClojureFile);
    context.subscriptions.push(moveClojureNamespace);    
}

// this method is called when your extension is deactivated
export function deactivate() {
}