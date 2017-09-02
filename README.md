# terminal-clojure README

This is the README for your extension "terminal-clojure". After writing up a brief description, we recommend including the following sections.

## Features

Add several commands to help using the integrated terminal

1) clojure start repl - Search for project.clj files under the open workspace folder and let you choose the project to start a repl (has a 5 seconds timeout)

2) clojure print namespace - execute (ns-name *ns*) which display the current namespace

3) clojure require namespace - execute (require '<open editor namespace> :reload) which sould reload the current file

4) clojure move to current namespace - execute (in-ns '<open editor namespace>) which move to the current file namespace

5) clojure refresh all - execute two commands. The first command is (require 'clojure.tools.namespace.repl) and the second one is (clojure.tools.namespace.repl/refresh-all)

6) clojure eval - if a text was selecetd in the open editor then it will be executed otherwise check if the cursor is inside a scope (inside parentheses) and execute the command in the scope.

## Requirements

Only one dependency; Leiningen - go to https://leiningen.org/ 

## Extension Settings

## Known Issues

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on OSX or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on OSX or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (OSX) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**