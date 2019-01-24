module.exports = function () {
	$.gulp.task('productionSet', function (done) { $.production = true; done(); });
	$.gulp.task(
		'production',
		$.gulp.series(
			'productionSet',
			$.gulp.parallel(
				'_css',
				$.gulp.series('_babel', '_js')
			),
			$.gulp.parallel(
				'css',
				$.gulp.series('babel', 'js')
			)
		)
	);
};