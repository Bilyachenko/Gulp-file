# Gulp for html css coding 

install gulp
<pre>npm install -g gulp</pre>
In project foldre create package.json
<pre>npm init</pre>
Install gulp locally to your project
<pre>npm install gulp --save-dev</pre>
###Creating a Basic less/Sass Compilation Tool
<pre>npm install gulp-less --save-dev</pre>
###Gulp concat css
<pre>npm install --save-dev gulp-concat-css</pre>
###gulp-notify
<pre>npm install --save-dev gulp-notify</pre>
###gulp-autoprefixer
<pre>npm install --save-dev gulp-autoprefixer</pre>
###Optimize Images
<pre>npm install gulp-imagemin --sav-dev</pre>
###gulp-livereload
<pre>npm install --save-dev gulp-livereload</pre>
###gulp-connect
<pre>npm install --save-dev gulp-connect</pre>
###gulp-plumber
<pre>npm install --save-dev gulp-plumber</pre>
###To install these plugins, run the following command:
<pre>$ npm install gulp-less gulp-autoprefixer gulp-concat-css gulp-notify gulp-livereload gulp-connect gulp-plumber del --save-dev</pre>
And add gulpfile.js with setings

If you have problem with run gulp
Add to toy package.json
<pre>"scripts": {
    "gulp": "gulp",
    "minify": "gulp minify"
  },</pre>
