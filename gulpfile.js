//corect
var gulp = require('gulp'),
	
	less = require('gulp-less'),
	prefix = require('gulp-autoprefixer'),
	concatCss = require('gulp-concat-css'),
	imagemin = require('gulp-imagemin'),
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	plumber = require('gulp-plumber'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	spritesmith = require("gulp.spritesmith");

	
gulp.task('sprite', function () {
	var spriteData = gulp.src('project/images/icons/*.png').pipe(spritesmith({

		imgName: 'sprite.png',

		cssName: 'sprite.less',
		cssFormat: 'less',
		padding: 10
	}));
	spriteData.img.pipe(gulp.dest('project/images/'));
	spriteData.css.pipe(gulp.dest('project/less/'));

});

	
	
//image min
gulp.task('compressIMG', function() {
 
  gulp.src('compress-img/*{png,jpg,gif}')
 
    .pipe(imagemin({
 
      optimizationLevel: 7,
 
      progressive: true
 
    }))
 
    .pipe(gulp.dest('project/images'))
 
});
	
// server connect
gulp.task('connect', function() {
	
	connect.server({
		
		root: 'project',
		livereload: true
	});
	
});


// less
gulp.task('less', function () {
	
 	var onError = function(err) {
		notify.onError({
		title:    "Gulp",
		subtitle: "Failure!",
		message:  "Error: <%= error.message %>",
		sound:    "Beep"
		})(err);
	
		this.emit('end');
	};
	
   return gulp.src('project/less/base.less')
   
		.pipe(plumber({errorHandler: onError}))
		
        .pipe(less())
		
			.pipe(prefix({
				browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
				cascade: false
			}))
		
		.pipe(concatCss('style.css'))
		.pipe(gulp.dest('project'))
		
		.pipe(notify({
			title: 'Gulp',
			subtitle: 'less success',
			message: 'less update',
			sound: "Pop"
		}))
		
		.pipe(connect.reload());
 
});

/*minify css*/
gulp.task('minCSS', function(){
	gulp.src('project/style.css')
		.pipe(minifyCSS())
		.pipe(rename('min.style.css'))
		.pipe(gulp.dest('project'))
});

//html
gulp.task('html', function(){
	gulp.src('project/*html')
		.pipe(notify({
			title: 'Gulp',
			subtitle: 'html success',
			message: 'html update',
			sound: "Pop"
		}))
		.pipe(connect.reload());
});

// watch
gulp.task('watch', function(){
	
	gulp.watch('project/less/*.less',['less']);
	gulp.watch('project/*html',['html']);

	gulp.watch('compress-img/*.{png,jpg,gif}',['img']);
	gulp.watch('project/images/icons/*.png',['sprite']);

	
});		

// default
gulp.task('default', ['connect', 'html', 'less', 'sprite', 'watch']);
