module.exports = function () {
	var build_css = function (src, concat, dest) {
		return $.gulp.src(src)
			.pipe($.wait(500))
			.pipe($._if(!$.production, $.sourcemaps.init({ loadMaps: true })))
			.pipe($.plumber(function (error) {
				$.gutil.log($.gutil.colors.red(error.message));
				$.gutil.beep(); //play a sound
				this.emit('end');
			}))
			.pipe(
				$._if('**/*.less', $.less({ compress: false }),
					$._if('**/*.scss', $.sass()))
			)
			.pipe($._if($.production, $.gcmq()))
			.pipe($._if($.production, $.autoprefixer('last 10 versions', 'ie 9')))
			.pipe($._if($.production, $.cleanCSS({
				level: 2,
				rebase: false
			})))
			.pipe($.concat(concat))
			.pipe($._if(!$.production, $.sourcemaps.write('.', { includeContent: true, sourceRoot: '/css/' })))
			.pipe($.gulp.dest(dest))
			.pipe($.browserSync.stream());
	};
	/* Assets */
	$.gulp.task('_css', function () {
		return build_css(
			$.config._css.src,
			$.config._css.build,
			'./build/'
		);
	});
	/* Own files */
	$.gulp.task('css', function () {
		return build_css(
			$.config.css.src,
			$.config.css.concat,
			$.config.css.dest
		);
	});
};