'use strict';

import * as vscode from 'vscode';

export function readNamespace() {

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

function getTextUpToCursor(editor: vscode.TextEditor) {
    var startPosition = new vscode.Position(0, 0);
    let range = new vscode.Range(startPosition, editor.selection.active);
    return editor.document.getText(range);
}

function getScopeStartIndex(text: string) {

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

    return startIndex;
}

export function getScopeStart(editor: vscode.TextEditor) {

    let text = getTextUpToCursor(editor);
    let startIndex = getScopeStartIndex(text);

    return startIndex === -1
            ? null
            : text.substring(startIndex);
}

export function getScopeEnd(editor: vscode.TextEditor) {
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

export function getCommandInScope(editor: vscode.TextEditor) {
    
    let firstPartOfCommand = getScopeStart(editor);
    if(firstPartOfCommand == null)
        return;

    let lastPartOfCommand = getScopeEnd(editor);
    if(lastPartOfCommand == null)
        return;

    return firstPartOfCommand + lastPartOfCommand;
}