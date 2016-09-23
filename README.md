# template-grunt
Template for init any project, includes Grunt tasks basics to frontend developping

Tasks included

## grunt dist
Generates distribution files to develop
  Runs 
  - **clean**: Cleans all files into distribution directory
  - **sass**: Generates CSS files from SCSS files from source directory to distribution directory
  - **imagemin**: Minify images source directory to distribution directory
  - **jshint**: JSHint Validate Javascript files from source directory and report on the terminal window
  - **copy:js**: Copies Javascirpt files from source directory to distribution directory
  - **copy:html**: Copies HTML files from source directory to distribution directory

## grunt dev
Generates distribution files to develop, watches files and run local webserver
  Runs 
  - **dist**: Generates distribution files to develop
  - **connect**: Create a local server form dist directory
    - default protocol: http
    - default hostname: localhost
    - default port: 9001
  - **imagemin**: Minify images source directory to distribution directory
  - **watch**: Watches files and runs specific tasks
    - Watches SCSS files from source directory and runs SCSS task
    - Watches HTML files from source directory and runs copy:html task
    - Watches Javascript files from source directory and runs copy:js task

## grunt build
Generates distribution files to production environment
  Runs 
  - **clean**: Cleans all files into distribution directory
  - **sass**: Generates CSS files from SCSS files from source directory to distribution directory
  - **cssmin**: Minimize CSS files from distribution directory to distribution directory (Override)
  - **jshint**: JSHint Validate Javascript files from source directory and report on the terminal window
  - **concat**: Concatenate all Javascript files on the source directory to a unique 'app.js' file into the distribution directory
  - **uglify**: Uglify from dist to dist, runs after **concatJs** task, so that use the same source and distribution directories.
  - **copy:html**: Copies HTML files from source directory to distribution directory
  - **imagemin**: Minify images source directory to distribution directory
  - **processhtml**: Process HTML, from distribution directory, merge script tags
