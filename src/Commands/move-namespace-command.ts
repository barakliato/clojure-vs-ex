import * as vscode from 'vscode';
import { IClojureContext } from '../clojure-context-interface';
import { readNamespace } from '../commands-utils';

export function registerMoveToCurrentNamespaceCommand(context: vscode.ExtensionContext,
                                                      clojure: IClojureContext) {
    
    const moveClojureNamespace = vscode.commands.registerCommand('clojure.namespace.move', () => {
        
        let namespace = readNamespace();
        if(namespace)
            clojure.repl.sendText(`(in-ns '${namespace})`);
    });
    
    context.subscriptions.push(moveClojureNamespace);    
}