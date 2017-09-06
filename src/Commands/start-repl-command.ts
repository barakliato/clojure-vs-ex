import * as vscode from 'vscode';
import { IClojureContext } from '../clojure-context-interface';
import { PathQuickPickItem } from '../PathQuickPickItem';

export function startReplOnDirectory(directory: string) {

    let terminal = vscode.window.createTerminal("clojure");
    terminal.sendText(`cd "${directory}"`);
    terminal.sendText("lein repl");
    terminal.show();
    return terminal;
}

export function registerStartReplCommand(context: vscode.ExtensionContext,
                                         clojure: IClojureContext) {
    
    function getProjects() {
        
        let cancellationTokenSource: vscode.CancellationTokenSource = new vscode.CancellationTokenSource();
        let projectsPaths = vscode.workspace.findFiles("**/project.clj", null, null, cancellationTokenSource.token);
        setTimeout(()=>{ cancellationTokenSource.cancel(); }, 5000);
        return projectsPaths.then(uris => {
            if(uris == null)
                return;

            return uris.map(uri => {
                return new PathQuickPickItem(uri);
            });
        });
    }

    function startRepl(selection: PathQuickPickItem) {
        clojure.repl = startReplOnDirectory(selection.description);
    }

    const clojureStart = vscode.commands.registerCommand('clojure.start', () => {
        
        getProjects().then(projects => {
            if(projects == null || projects.length === 0) {
                vscode.window.showWarningMessage("No project.clj was found");
                return;
            }

            if(projects.length === 1) {
                startRepl(projects[0]); 
            } else {
                let selectionTask = vscode.window.showQuickPick(projects);
                selectionTask.then(startRepl);
            }
        });
    });   

    context.subscriptions.push(clojureStart);    
}