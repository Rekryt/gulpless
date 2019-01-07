module.exports = function () {
	$.gulp.task(
		'default',
		['_css', '_babel', '_js', 'css', 'babel', 'js', 'browserSync', 'watch']
	);
};