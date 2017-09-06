'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { IClojureContext } from './clojure-context-interface'; 
import { registerStartReplCommand, startReplOnDirectory } from './Commands/start-repl-command';
import { registerPrintNamespaceCommand } from './Commands/print-namespace-command';
import { registerMoveToCurrentNamespaceCommand } from './Commands/move-namespace-command';
import { registerLoadNamespaceCommand } from './Commands/load-namespace-command';
import { registerRunTestsCommand } from './Commands/run-tests-command';
import { registerRefreshAllCommand } from './Commands/refresh-all-command';
import { registerEvalScopeCommand } from './Commands/eval-scope-command';
import { registerLoadDebuggerCommand } from './Commands/load-debugger-command';
import { registerSetBreakpointCommand } from './Commands/set-breakpoint-command';
import { registerResumeDebuggerCommand } from './Commands/resume-debugger-command';

class ClojureContext implements IClojureContext {

    private _repl: vscode.Terminal;

    public get repl () {
        if(this._repl == null) {
            vscode.window.showInformationMessage("Starting the repl on the current directory");
            this._repl = startReplOnDirectory("");
        }
            
        return this._repl;
    }

    public set repl (terminal: vscode.Terminal) {
        this._repl = terminal;
    }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    const clojure: IClojureContext = new ClojureContext();

    registerRefreshAllCommand(context, clojure);
    registerRunTestsCommand(context, clojure);
    registerStartReplCommand(context, clojure);    
    registerPrintNamespaceCommand(context, clojure);
    registerLoadNamespaceCommand(context, clojure);
    registerMoveToCurrentNamespaceCommand(context, clojure);   
    registerEvalScopeCommand(context, clojure);
    registerLoadDebuggerCommand(context, clojure);
    registerSetBreakpointCommand(context, clojure);    
    registerResumeDebuggerCommand(context, clojure);
}

// this method is called when your extension is deactivated
export function deactivate() {
}