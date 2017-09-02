# terminal-clojure README

This extension allow to work with clojure using vscode integrated terminal.
The extension does not provide syntax highlite, paraedit, parinfer or autocomplete, there is other extensions that provide it and they can be used together.

## Features

Add several commands to help using the integrated terminal

1) clojure start repl - Search for project.clj files under the open workspace folder and let you choose the project to start a repl (has a 5 seconds timeout)

2) clojure print namespace - execute (ns-name *ns*) which display the current namespace

3) clojure require namespace - execute (require '[open editor namespace] :reload) which sould reload the current file

4) clojure move to current namespace - execute (in-ns '[open editor namespace]) which move to the current file namespace

5) clojure refresh all - execute two commands. The first command is (require 'clojure.tools.namespace.repl) and the second one is (clojure.tools.namespace.repl/refresh-all)

6) clojure eval - if a text was selecetd in the open editor then it will be executed otherwise check if the cursor is inside a scope (inside parentheses) and execute the command in the scope.

## Requirements

Only one dependency; Leiningen - go to https://leiningen.org/ 