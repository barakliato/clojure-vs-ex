import * as vscode from 'vscode';
import { IClojureContext } from '../clojure-context-interface';
import { getCommandInScope } from '../commands-utils';

export function registerEvalScopeCommand(context: vscode.ExtensionContext,
                                         clojure: IClojureContext) {
    
    function getSelectedText(editor: vscode.TextEditor) {

        if(editor.selection.isEmpty)
            return null;

        return editor.document.getText(editor.selection);
    }        

    const evalScope = vscode.commands.registerCommand('clojure.eval', () => {        
                
        let editor = vscode.window.activeTextEditor;
        if(!editor || editor.document.lineCount === 0) 
            return;
        
        let command = getSelectedText(editor);
        if(command == null)
            command = getCommandInScope(editor);

        if(command != null)
            clojure.repl.sendText(command);
    });
            
    context.subscriptions.push(evalScope);
}