import * as vscode from 'vscode';
import { IClojureContext } from '../clojure-context-interface';
import { getScopeStart,
         getScopeEnd } from '../commands-utils';

export function registerSetBreakpointCommand(context: vscode.ExtensionContext,                                             
                                             clojure: IClojureContext) {
    
    const setBreakpoint = vscode.commands.registerCommand('clojure.debugger.breakpoint', () => {
                    
        let editor = vscode.window.activeTextEditor;
        if(!editor || editor.document.lineCount === 0) 
            return;

        let firstPartOfCommand = getScopeStart(editor);
        if(firstPartOfCommand == null)
            return;
    
        let lastPartOfCommand = getScopeEnd(editor);
        if(lastPartOfCommand == null)
            return;
    
        const command = firstPartOfCommand + " (break!) " + lastPartOfCommand;
        clojure.repl.sendText(command);
    });
    
    context.subscriptions.push(setBreakpoint);    
}