var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var gcmq = require('gulp-group-css-media-queries');
var concat = require('gulp-concat');
var less = require('gulp-less');
var sass = require('gulp-sass'); sass.compiler = require('node-sass');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var _if = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps'); //https://github.com/gulp-sourcemaps/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support
var plumber = require('gulp-plumber');
var wait = require('gulp-wait');

var production = false;
const config = {
	proxy: 'example.rekryt.ru',
	src: [
		// jquery 3.3.1
		{
			js: ['./src/assets/jquery-3.3.1.js']
		},
		// jquery.scrollTo
		{
			js: ['./src/assets/jquery.scrollTo.min.js']
		},
		// jquery.validate
		{
			js: ['./src/assets/jquery.validate.min.js']
		},
		// Select2
		{	
			css: ['./src/assets/select2/css/select2.css',],
			js: [
				'./src/assets/select2/js/select2.js',
				'./src/assets/select2/js/i18n/ru.js'
			]
		},
		// Bootstrap ( Dist )
		{
			js: ['./src/assets/bootstrap/js/bootstrap.js'],
			css: ['./src/assets/bootstrap/css/bootstrap.css']
		},
		/*/ Bootstrap ( Src )
		{
			js: ['./src/assets/bootstrap/js/bootstrap.js'], //dist
			sass: ['./src/assets/bootstrap/scss/bootstrap.scss']
		},*/
		// Own files
		{
			less: ['./src/less/main.less'],
			sass: ['./src/sass/main.scss'],
			//css: ['./src/css/main.css'],
			babel: ['./src/js/script.js'],
			js: ['./src/js/babel.js']
		}
	],
	less: {
		watch: ['./src/less/*.less'],
		dest: './src/css',
		concat: 'less.css'
	},
	sass: {
		watch: ['./src/**/*.scss'],
		dest: './src/css',
		concat: 'sass.css'
	},
	css: {
		dest: './dist/example',
		concat: 'style.css'
	},
	babel: {
		dest: './src/js',
		concat: 'babel.js'
	},
	js: {
		watch: ['./src/js/*.js', '!./src/js/babel.js'],
		dest: './dist/example',
		concat: 'script.js'
	},
	serveStatic: [
		{ route: "templates/example", dir: "./dist/example" }
	]
};
for (var i in config.src) {
	var keys = Object.keys(config.src[i]);
	for (var j in keys) {
		if (typeof config[keys[j]].src != 'object') config[keys[j]].src = [];
		config[keys[j]].src = config[keys[j]].src.concat(config.src[i][keys[j]])
	}
};

gulp.task('build', function () {
	return gulp.src(config.css.src.concat(config.sass.src.concat(config.less.src)))
		.pipe(wait(500))
		.pipe(_if(!production, sourcemaps.init()))
		.pipe(plumber(function (error) {
			gutil.log(gutil.colors.red(error.message));
			gutil.beep(); //play a sound
			this.emit('end');
		}))
		.pipe(
			_if('**/*.less', less({ compress: false }),
				_if('**/*.scss', sass()))
		)
		.pipe(_if(production, gcmq()))
		.pipe(_if(production, autoprefixer('last 10 versions', 'ie 9')))
		.pipe(cleanCSS({
			level: 2,
			rebase: false
		}))
		.pipe(concat(config.css.concat))
		.pipe(_if(!production, sourcemaps.write('.', { includeContent: true, sourceRoot: '/css/' })))
		.pipe(gulp.dest(config.css.dest))
		.pipe(browserSync.stream());
});

gulp.task('buildBabel', function () {
	return gulp.src(config.babel.src)
		.pipe(_if(!production, sourcemaps.init()))
		.pipe(plumber(function (error) {
			gutil.log(gutil.colors.red(error.message));
			gutil.beep(); //play a sound
			this.emit('end');
		}))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(concat(config.babel.concat))
		.pipe(_if(!production, sourcemaps.write('.', { includeContent: true, sourceRoot: '/babel/' })))
		.pipe(gulp.dest(config.babel.dest));
});

gulp.task('buildJs', function () {
	return gulp.src(config.js.src)
		.pipe(_if(!production, sourcemaps.init({ loadMaps: true })))
		.pipe(plumber(function (error) {
			gutil.log(gutil.colors.red(error.message));
			gutil.beep(); //play a sound
			this.emit('end');
		}))
		.pipe(concat(config.js.concat))
		.pipe(uglify())
		.pipe(_if(!production, sourcemaps.write('.', { includeContent: true, sourceRoot: '/js/' })))
		.pipe(gulp.dest(config.js.dest));
});

gulp.task('watch', function () {
	return gulp.watch(config.sass.watch.concat(config.less.watch), ['build']);
});
gulp.task('watchJs', function () {
	return gulp.watch(config.js.watch.concat(config.babel.src), ['buildBabel', 'buildJs', 'browserSyncReload']);//.on('change', browserSync.reload);
});

gulp.task('browserSync', function () {
	return browserSync.init({
		proxy: config.proxy,
		serveStatic: config.serveStatic
	});
});
gulp.task('browserSyncReload', function () {
	browserSync.reload();
});

gulp.task('productionSet', function () { production = true; });
gulp.task('production', ['productionSet', 'build', 'buildBabel', 'buildJs']);

gulp.task('default', ['build', 'buildBabel', 'buildJs', 'browserSync', 'watch', 'watchJs']);