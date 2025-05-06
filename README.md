# FileChecker

## Description
- find suspicious pieces of code in your files

## Installation
- npm i -g @dvorakradek/file-checker

## Usage
- Will go through the directory, find all files with searched expression and save it into a result file. If executed as a cron job, it will create a diff file with new files found since the last run.
- example: check-files /path/to/directory /path/to/result/directory php "expression1|expression2"
- execute **check-files** --help for usage info