"use strict";

global.GLOBAL.$ = {
	/* config */
	config: require('./gulp/config.js')(),

	/* gulp & gulp plugins */
	gulp: require('gulp'),
	gutil: require('gulp-util'),
	autoprefixer: require('gulp-autoprefixer'),
	cleanCSS: require('gulp-clean-css'),
	gcmq: require('gulp-group-css-media-queries'),
	concat: require('gulp-concat'),
	less: require('gulp-less'),
	sass: require('gulp-sass'),
	uglify: require('gulp-uglify'),
	babel: require('gulp-babel'),
	_if: require('gulp-if'),
	sourcemaps: require('gulp-sourcemaps'), //https://github.com/gulp-sourcemaps/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support
	plumber: require('gulp-plumber'),
	wait: require('gulp-wait'),

	/* browserSync */
	browserSync: require('browser-sync').create()
};
$.sass.compiler = require('node-sass');
[
	'./gulp/tasks/css.js',
	'./gulp/tasks/babel.js',
	'./gulp/tasks/js.js',
	'./gulp/tasks/watch.js',
	'./gulp/tasks/browserSync.js',
	'./gulp/tasks/production.js',
	'./gulp/tasks/default.js'
]
.forEach(function (taskPath) {
	require(taskPath)();
});