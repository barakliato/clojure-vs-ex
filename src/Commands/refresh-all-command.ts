import * as vscode from 'vscode';
import { IClojureContext } from '../clojure-context-interface';

export function registerRefreshAllCommand(context: vscode.ExtensionContext,
                                          clojure: IClojureContext) {
    
    const refreshAll = vscode.commands.registerCommand('clojure.refresh.all', () => {
        
        clojure.repl.sendText("(require 'clojure.tools.namespace.repl)", true);
        clojure.repl.sendText("(clojure.tools.namespace.repl/refresh-all)");
    });
    
    context.subscriptions.push(refreshAll);    
}