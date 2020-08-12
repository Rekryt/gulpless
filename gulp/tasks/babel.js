var $ = require('../global.js');

module.exports = function () {
	var build_babel = function (src, concat, dest) {
		return $.gulp
			.src(src, { allowEmpty: true })
			.pipe($._if(!$.production, $.sourcemaps.init({ loadMaps: true })))
			.pipe(
				$.plumber(function (error) {
					$.gutil.log($.gutil.colors.red(error.message));
					$.gutil.beep(); //play a sound
					this.emit('end');
				})
			)
			.pipe(
				$.babel({
					presets: ['@babel/env'],
				})
			)
			.pipe($.concat(concat))
			.pipe($._if(!$.production, $.sourcemaps.write('.', { includeContent: true, sourceRoot: '/babel/' })))
			.pipe($.gulp.dest(dest));
	};
	/* Assets */
	$.gulp.task('_babel', function (done) {
		if ($.config._babel.src.length > 0) {
			return build_babel($.config._babel.src, $.config._babel.build, './build/');
		} else {
			done();
		}
	});
	/* Own files */
	$.gulp.task('babel', function (done) {
		if ($.config.babel.src.length > 0) {
			return build_babel($.config.babel.src, $.config.babel.build, './build/');
		} else {
			done();
		}
	});
};
