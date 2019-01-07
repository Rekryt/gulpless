module.exports = function () {
	$.gulp.task('watch', function () {
		$.gulp.watch(
			[]
			.concat($.config.sass.watch)
			.concat($.config.less.watch)
			.concat($.config.css.watch),
			['css']
		);
		$.gulp.watch(
			[]
			.concat($.config.js.src)
			.concat($.config.babel.src),
			['babel', 'js', 'browserSyncReload']
		); //.on('change', browserSync.reload);
	});
};