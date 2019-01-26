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
			.concat($.config.webpack.src)
			.concat(['!'+'./build/'+$.config.babel.build])
			.concat(['!'+'./build/'+$.config.webpack.build]),
			$.gulp.series('babel', 'webpack', 'js', 'browserSyncReload')
		); //.on('change', browserSync.reload);
	});
};