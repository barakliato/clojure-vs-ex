import * as vscode from 'vscode';
import { IClojureContext } from '../clojure-context-interface';

export function registerRunTestsCommand(context: vscode.ExtensionContext,
                                        clojure: IClojureContext) {
    
    const runTests = vscode.commands.registerCommand('clojure.run.tests', ()=> {
        
        clojure.repl.sendText("(run-tests)");
    });
    
    context.subscriptions.push(runTests);    
}