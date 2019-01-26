module.exports = function () {
	$.gulp.task('browserSync', function () {
		return $.browserSync.init({
			proxy: $.config.proxy,
			serveStatic: $.config.serveStatic,
			https: $.config.https
			/*socket: {
				domain: $.config.proxy
			}*/
		});
	});
	$.gulp.task('browserSyncReload', function (done) {
		$.browserSync.reload();
		done();
	});
};