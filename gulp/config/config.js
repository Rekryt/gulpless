module.exports = function () {
	var config = {
		production: false,
		proxy: 'example.rekryt.ru',
		serveStatic: [
			{ route: "templates/example", dir: "./dist/example" }
		],
		src: [
			// jquery 3.3.1
			{
				js: ['./src/assets/jquery-3.3.1.js']
			},
			// jquery.scrollTo
			{
				js: ['./src/assets/jquery.scrollTo.min.js']
			},
			// jquery.validate
			{
				js: ['./src/assets/jquery.validate.min.js']
			},
			// Select2
			{
				css: ['./src/assets/select2/css/select2.css'],
				js: [
					'./src/assets/select2/js/select2.js',
					'./src/assets/select2/js/i18n/ru.js'
				]
			},
			// Bootstrap ( Dist )
			{
				js: ['./src/assets/bootstrap/js/bootstrap.js'],
				css: ['./src/assets/bootstrap/css/bootstrap.css']
			},
			/*/ Bootstrap ( Src )
			{
				js: ['./src/assets/bootstrap/js/bootstrap.js'], //dist
				sass: ['./src/assets/bootstrap/scss/bootstrap.scss']
			},*/
			// Own files
			{
				less: ['./src/less/main.less'],
				sass: ['./src/sass/main.scss'],
				//css: ['./src/css/main.css'],
				babel: ['./src/js/script.js'],
				js: ['./src/js/babel.js']
			}
		],
		less: {
			watch: ['./src/less/*.less'],
			dest: './src/css',
			concat: 'less.css'
		},
		sass: {
			watch: ['./src/**/*.scss'],
			dest: './src/css',
			concat: 'sass.css'
		},
		css: {
			dest: './dist/example',
			concat: 'style.css'
		},
		babel: {
			dest: './src/js',
			concat: 'babel.js'
		},
		js: {
			watch: ['./src/js/*.js', '!./src/js/babel.js'],
			dest: './dist/example',
			concat: 'script.js'
		}
	};
	for (var i in config.src) {
		if (config.src.hasOwnProperty(i)) {
			var keys = Object.keys(config.src[i]);
			for (var j in keys) {
				if (typeof config[keys[j]].src != 'object') config[keys[j]].src = [];
				config[keys[j]].src = config[keys[j]].src.concat(config.src[i][keys[j]])
			}
		}
	}
	return config;
};