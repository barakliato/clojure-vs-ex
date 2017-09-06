import * as vscode from 'vscode';
import { IClojureContext } from '../clojure-context-interface';

export function registerPrintNamespaceCommand(context: vscode.ExtensionContext,
                                              clojure: IClojureContext) {
    
    const printCurrentNamespace = vscode.commands.registerCommand('clojure.namespace.print', () => {

        clojure.repl.sendText("(ns-name *ns*)");
    });
    
    context.subscriptions.push(printCurrentNamespace);    
}