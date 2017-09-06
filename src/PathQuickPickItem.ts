import * as vscode from 'vscode';

export class PathQuickPickItem implements vscode.QuickPickItem {

    constructor(uri: vscode.Uri) {

        let index = uri.fsPath.lastIndexOf("/project.clj");
        let pathToProjectFile = uri.fsPath.substring(0, index);
        index = pathToProjectFile.lastIndexOf("/") + 1;
        this.label = pathToProjectFile.substring(index);
        this.description =  pathToProjectFile;
    }

    public label: string;

    public description: string;

    toString(): string {
        return this.label;
    }
}