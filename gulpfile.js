[
	'./gulp/tasks/css.js',
	'./gulp/tasks/babel.js',
	'./gulp/tasks/js.js',
	'./gulp/tasks/watch.js',
	'./gulp/tasks/browserSync.js',
	'./gulp/tasks/production.js',
	'./gulp/tasks/default.js'
]
.forEach(function (taskPath) {
	require(taskPath)();
});
