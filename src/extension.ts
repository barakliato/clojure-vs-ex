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

    function getScopeStart(editor: vscode.TextEditor) {
        var startPosition = new vscode.Position(0, 0);
        let range = new vscode.Range(startPosition, editor.selection.active);
        let text = editor.document.getText(range);        
        
        let startIndex = -1;
        let parenthesesCount = 0;
        for(let i = text.length; i > -1 && startIndex < 0; i--) {
            if(text[i] === "(") {
                if(parenthesesCount === 0)
                    startIndex = i;

                parenthesesCount--;
            }

            if(text[i] === ")")
                parenthesesCount++;
        }

        return startIndex === -1
               ? null
               : text.substring(startIndex);
    }

    function getScopeEnd(editor: vscode.TextEditor) {
        let lastLine = editor.document.lineAt(editor.document.lineCount -1);
        let range = new vscode.Range(editor.selection.active, lastLine.range.end);
        let text = editor.document.getText(range);

        let endIndex = -1;
        let parenthesesCount = 0;
        for(let i = 0; i < text.length && endIndex < 0; i++) {
            if(text[i] === ")") {                
                if(parenthesesCount === 0)
                    endIndex = i;

                parenthesesCount--;
            }

            if(text[i] === "(")
                parenthesesCount++;
        }

        return endIndex === -1
               ? null
               : text.substring(0, endIndex + 1);
    }

    function getCommandInScope(editor: vscode.TextEditor) {
        
        let firstPartOfCommand = getScopeStart(editor);
        if(firstPartOfCommand == null)
            return;

        let lastPartOfCommand = getScopeEnd(editor);
        if(lastPartOfCommand == null)
            return;

        return firstPartOfCommand + lastPartOfCommand;
    }

    function getSelectedText(editor: vscode.TextEditor) {

        if(editor.selection.isEmpty)
            return null;

        return editor.document.getText(editor.selection);
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
            clojure.repl.sendText(`(require '${namespace} :reload)`);
    });

    const moveClojureNamespace = vscode.commands.registerCommand('clojure.namespace.move', () => {
        
        let namespace = readNamespace();
        if(namespace)
            clojure.repl.sendText(`(in-ns '${namespace})`);
    });

    const refreshAll = vscode.commands.registerCommand('clojure.refresh.all', () => {
        
        clojure.repl.sendText("(require 'clojure.tools.namespace.repl)", true);
        clojure.repl.sendText("(clojure.tools.namespace.repl/refresh-all)");
    });

    const evalScope = vscode.commands.registerCommand('clojure.eval', () => {
        
        try
        {
            let editor = vscode.window.activeTextEditor;
            if(!editor || editor.document.lineCount === 0) 
                return;
            
            let command = getSelectedText(editor);
            if(command == null)
                command = getCommandInScope(editor);

            if(command != null)
                console.log(command);
        }
        catch(e) {
            console.log(e);
        }
    });

    context.subscriptions.push(clojureStart);
    context.subscriptions.push(printCurrentNamespace);
    context.subscriptions.push(loadClojureFile);
    context.subscriptions.push(moveClojureNamespace);
    context.subscriptions.push(refreshAll);
    context.subscriptions.push(evalScope);
}

// this method is called when your extension is deactivated
export function deactivate() {
}