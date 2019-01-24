module.exports = function () {
	$.gulp.task('watch', function () {
		$.gulp.watch(
			[]
			.concat($.config.sass.watch)
			.concat($.config.less.watch)
			.concat($.config.css.watch),
			$.gulp.series('css')
		);
		$.gulp.watch(
			[]
			.concat($.config.js.src)
			.concat($.config.babel.src)
			.concat(['!'+'./build/'+$.config.babel.build]),
			$.gulp.series('babel', 'js', 'browserSyncReload')
		); //.on('change', browserSync.reload);
	});
};