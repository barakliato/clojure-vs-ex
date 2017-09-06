import * as vscode from 'vscode';
import { IClojureContext } from '../clojure-context-interface';
import { readNamespace } from '../commands-utils';

export function registerLoadNamespaceCommand(context: vscode.ExtensionContext,
                                             clojure: IClojureContext) {
    
    const loadClojureFile = vscode.commands.registerCommand('clojure.namespace.load', () => {
        
        let namespace = readNamespace();
        if(namespace)
            clojure.repl.sendText(`(require '${namespace} :reload)`);
    });
    
    context.subscriptions.push(loadClojureFile);    
}