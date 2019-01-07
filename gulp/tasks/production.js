module.exports = function () {
	$.gulp.task('productionSet', function () { $.production = true; });
	$.gulp.task('production', ['productionSet', 'css', 'babel', 'js']);
};