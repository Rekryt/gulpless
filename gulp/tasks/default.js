module.exports = function () {
	$.gulp.task(
		'default',
		$.gulp.series(
			$.gulp.parallel(
				'_css',
				$.gulp.series('_babel', '_webpack', '_js')
			),
			$.gulp.parallel(
				'css',
				$.gulp.series('babel', 'webpack', 'js')
			),
			$.gulp.parallel(
				'browserSync',
				'watch'
			)
		)
	);
};