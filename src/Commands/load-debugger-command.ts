import * as vscode from 'vscode';
import { IClojureContext } from '../clojure-context-interface';

export function registerLoadDebuggerCommand(context: vscode.ExtensionContext,
                                            clojure: IClojureContext) {
    
    const loadDebbuger = vscode.commands.registerCommand('clojure.debugger.load', () => {
                    
            clojure.repl.sendText("(require '[com.gfredericks.debug-repl :refer [break! unbreak!]])");
    });
    
    context.subscriptions.push(loadDebbuger);    
}