var gulp = require('gulp'),
	
	less = require('gulp-less'),
	prefix = require('gulp-autoprefixer'),
	concatCss = require('gulp-concat-css'),
	imagemin = require('gulp-imagemin'),
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect');

	
//imagemin
gulp.task('img', function() {
 
  gulp.src('img/*{png,jpg,gif}')
 
    .pipe(imagemin({
 
      optimizationLevel: 7,
 
      progressive: true
 
    }))
 
    .pipe(gulp.dest('img'))
 
});
	
// server connect
gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});


// less
gulp.task('less', function () {
 
    gulp.src('css/*.less')
 
        .pipe(less())
		.pipe(prefix({
			browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
            cascade: false
		}))
		.pipe(concatCss('style.css'))
		.pipe(gulp.dest('css'))
		.pipe(notify('Done!'))
		.pipe(connect.reload());
 
});
 
//html
gulp.task('html', function(){
	gulp.src('*html')
		.pipe(connect.reload());
});

// watch
gulp.task('watch', function(){
	
	gulp.watch('css/*.less',['less']);
	gulp.watch('index.html',['html']);
	gulp.watch('img/*.{png,jpg,gif}',['img']);
	
});		

// default
gulp.task('default', ['connect', 'html', 'less', 'img', 'watch']);
	
