//corect
var gulp = require('gulp'),
	
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	concatCss = require('gulp-concat-css'),
	//imagemin = require('gulp-imagemin'),
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	webserver = require('gulp-webserver'),
	plumber = require('gulp-plumber'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	spritesmith = require("gulp.spritesmith");


	
gulp.task('sprite', function () {
	var spriteData = gulp.src('project/images/icons/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.scss',
		cssFormat: 'scss',
		padding: 10
	}));
	spriteData.img.pipe(gulp.dest('project/images/'));
	spriteData.css.pipe(gulp.dest('project/sass/'));

});

// sass
gulp.task('sass', function () {
	
 	var onError = function(err) {
		notify.onError({
		title:    "Gulp",
		subtitle: "Failure!",
		message:  "Error: <%= error.message %>",
		sound:    "Beep"
		})(err);
	
		this.emit('end');
	};
	
   return gulp.src('project/sass/base.scss')

   
		.pipe(plumber({errorHandler: onError}))

        .pipe(sass({
			includePaths: require('node-bourbon').includePaths,
			style: 'compressed',
			quiet: true
		}))
		
		.pipe(prefix({
			browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
			cascade: false
		}))

		.pipe(concatCss('style.css'))
		.pipe(gulp.dest('project'))
		
		.pipe(notify({
			title: 'Gulp',
			subtitle: 'sass success',
			message: 'sass update OK',
			sound: false
		}))
 
});
	
	
//image min
/*gulp.task('compressIMG', function() {
 
  gulp.src('compress-img/*{png,jpg,gif}')
 
    .pipe(imagemin({
 
      optimizationLevel: 7,
 
      progressive: true
 
    }))
 
    .pipe(gulp.dest('project/content-images'))
 
});*/
	
// webserver
gulp.task('webserver', function() {
	
	gulp.src('project')
	.pipe(webserver({
		port:4000,
		livereload: true,
		open: true
	}));
	
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
			message: 'html update OK',
			sound: false
		}))

});

// watch
gulp.task('watch', function(){
	
	gulp.watch('project/images/icons/*.png',['sprite']);
	//gulp.watch('compress-img/*.{png,jpg,gif}',['compressIMG']);
	gulp.watch('project/sass/*.scss',['sass']);
	gulp.watch('project/*html',['html']);
	gulp.watch('project/style.css',['minCSS']);

	

});		

// default
gulp.task('default', [ 'watch', 'webserver', 'html', 'minCSS', 'sass', 'sprite']);
