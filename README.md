# Blocka
## FUNdaMENTALs of Software Engineering

Run this to save your HTTPS credentials:
`git config credential.helper store`

You need to clone recursively:
`git clone --recursive https://github.uiowa.edu/hbwhite/blocka.git`

To test the code (you'll want to run a server locally otherwise JavaScript will have access to your files via the file:// protocol which is unsecured):
`cd blocka/ && python -m SimpleHTTPServer 8080`

...and then browse it at `http://localhost:8080`

Inspiration for the project name:

https://www.youtube.com/watch?v=QUIrUOdzwmo

