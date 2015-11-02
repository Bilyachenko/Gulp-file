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
	spritesmith = require("gulp.spritesmith");


gulp.task('sprite', function () {
  var spriteData = gulp.src('img/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
	padding: 10
  }));
  return spriteData.pipe(gulp.dest('sprites/'));
});
	
//imagemin
gulp.task('img', function() {
 
  gulp.src('compress-img/*{png,jpg,gif}')
 
    .pipe(imagemin({
 
      optimizationLevel: 7,
 
      progressive: true
 
    }))
 
    .pipe(gulp.dest('images'))
 
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
	
 	var onError = function(err) {
		notify.onError({
		title:    "Gulp",
		subtitle: "Failure!",
		message:  "Error: <%= error.message %>",
		sound:    "Beep"
		})(err);
	
		this.emit('end');
	};
	
   return gulp.src('css/less/base.less')
 	.pipe(plumber({errorHandler: onError}))
        .pipe(less())
		.pipe(prefix({
			browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
            cascade: false
		}))
		.pipe(concatCss('./style.css'))
		.pipe(gulp.dest('css'))
		.pipe(notify({
			title: 'Gulp',
			subtitle: 'success',
			message: 'less Ok!',
			sound: "Pop"
		}))
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
	gulp.watch('compress-img/*.{png,jpg,gif}',['img']);
	gulp.watch('img/icons/*.png',['sprite']);
	
});		

// default
gulp.task('default', ['connect', 'html', 'img', 'less', 'sprite', 'watch']);
