var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var gcmq = require('gulp-group-css-media-queries');

const config = {
	proxy: 'example.zone',
	root: './',
	less: {
		watch: 'less/*.less',
		src: 'less/*.less',
		dest: 'css'
	},
	css: {
		watch: 'css/*.css',
		serveStatic: [{
			route: ['/templates/example-template-route/css'],
			dir: 'css'
		}]
	}
};

gulp.task('build', function () {
    gulp.src(config.root + config.less.src)
    	.pipe(less({compress: true}).on('error', gutil.log))
        .pipe(gcmq())
        .pipe(autoprefixer('last 10 versions', 'ie 9'))
        .pipe(cleanCSS({level: 2}))
        .pipe(gulp.dest(config.root + config.less.dest))
        .pipe(browserSync.stream());
});

gulp.task('watch', ['browserSync'], function () {
	gulp.watch(config.root + config.less.watch, ['build']);
});

gulp.task('browserSync', function () {
	browserSync.init({
		proxy: config.proxy,
		serveStatic: config.css.serveStatic
	});
});

gulp.task('default', ['build', 'watch']);