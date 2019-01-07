module.exports = function () {
	var build_js = function (src, concat, dest) {
		return $.gulp.src(src)
			.pipe($._if(!$.production, $.sourcemaps.init({ loadMaps: true })))
			.pipe($.plumber(function (error) {
				$.gutil.log($.gutil.colors.red(error.message));
				$.gutil.beep(); //play a sound
				this.emit('end');
			}))
			.pipe($.concat(concat))
			.pipe($._if($.production, $.uglify()))
			.pipe($._if(!$.production, $.sourcemaps.write('.', { includeContent: true, sourceRoot: '/js/' })))
			.pipe($.gulp.dest(dest));
	};
	/* Assets */
	$.gulp.task('_js', function () {
		return build_js(
			$.config._js.src,
			$.config._js.build,
			'./build/'
		);
	});
	/* Own files */
	$.gulp.task('js', function () {
		return build_js(
			$.config.js.src,
			$.config.js.concat,
			$.config.js.dest
		);
	});
};