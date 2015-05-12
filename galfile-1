//less, autoprefixer, livereload, connect 

var gulp = require('gulp'),
	
	less = require('gulp-less'),
	prefix = require('gulp-autoprefixer'),
	
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect');

	
// server connect
gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});


// less
gulp.task('less', function () {
 
    gulp.src('css/less/*.less')
 
        .pipe(less())
		.pipe(prefix({
			browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
            cascade: false
		}))
		
		.pipe(gulp.dest('css/'))
		.pipe(connect.reload());
 
});
 
//html
gulp.task('html', function(){
	gulp.src('*html')
		.pipe(connect.reload());
});

// watch
gulp.task('watch', function(){
	
	gulp.watch('css/less/*.less',['less']);
	gulp.watch('index.html',['html']);
	
});		

// default
gulp.task('default', ['connect', 'html', 'less', 'watch']);
	
