import * as vscode from 'vscode';
import { IClojureContext } from '../clojure-context-interface';

export function registerResumeDebuggerCommand(context: vscode.ExtensionContext,
                                              clojure: IClojureContext) {
    
    const resumeDebugger = vscode.commands.registerCommand('clojure.debugger.resume', () => {
                    
            clojure.repl.sendText("(unbreak!)");
    });
    
    context.subscriptions.push(resumeDebugger);    
}