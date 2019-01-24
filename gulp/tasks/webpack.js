module.exports = function () {
	let firstBuildReady = false;
	function done(err, stats) {
		firstBuildReady = true;

		if (err) return; //emit('error', err) in webpack-stream

		$.gutil.log($.gutil.colors.red(stats.toString()));
	}
	
	let build_webpack = function (src, concat, dest, callback) {
		let options = {
			output: {
				filename: concat,
				path: $.path.resolve(__dirname, dest),
				publicPath: '/dist/'
			},
			watch: !$.production,
			devtool: !$.production ? 'inline-source-map' : null,
			module: {
				rules: [
					{
						test:	/\.js$/,
						loader: 'babel-loader',
						exclude: '/node_modules/'
					}
				]
			},
			plugins: [
				new $.webpack.NoEmitOnErrorsPlugin()
			],
			mode: "production"
		};
		return $.gulp.src(src)
			.pipe($.plumber(function (error) {
				$.gutil.log($.gutil.colors.red(error.message));
				$.gutil.beep(); //play a sound
				this.emit('end');
			}))
			.pipe($.webpackStream(options, $.webpack, done))
			.pipe($.gulp.dest(dest))
			.on("data", function () {
				if (firstBuildReady) callback();
			});
	};
	/* Assets */
	$.gulp.task('_webpack', function (callback) {
		if ($.config._webpack.src.length > 0) {
			return build_webpack(
				$.config._webpack.src,
				$.config._webpack.build,
				'./build/',
				callback
			);
		} else {
			callback();
		}
	});
	/* Own files */
	$.gulp.task('webpack', function (callback) {
		if ($.config.webpack.src.length > 0) {
			return build_webpack(
				$.config.webpack.src,
				$.config.webpack.build,
				'./build/',
				callback
			);
		} else {
			callback();
		}
	});
};