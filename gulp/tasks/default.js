var $ = require('../global.js');

module.exports = function () {
	$.gulp.task(
		'default',
		$.gulp.series(
			$.gulp.parallel('_css', $.gulp.series('_babel', '_js')),
			$.gulp.parallel('css', $.gulp.series('babel', 'js')),
			$.gulp.parallel('browserSync', 'watch')
		)
	);
};
