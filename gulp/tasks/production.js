module.exports = function () {
	$.gulp.task('productionSet', function () { $.production = true; });
	$.gulp.task(
		'production',
		$.gulp.series(
			'productionSet',
			$.gulp.parallel(
				'css',
				$.gulp.series('babel', 'js')
			)
		)
	);
};