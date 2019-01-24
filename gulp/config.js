module.exports = function () {
	var config = {
		production: false,
		proxy: 'http://example.rekryt.ru',
		https: false,
		serveStatic: [
			{ route: "templates/example", dir: "./dist/example" }
		],
		src: [
			/* Assets */
			// jquery 3.3.1
			{
				_js: ['./src/assets/jquery-3.3.1.js']
			},
			// jquery.scrollTo
			{
				_js: ['./src/assets/jquery.scrollTo.min.js']
			},
			// jquery.validate
			{
				_js: ['./src/assets/jquery.validate.min.js']
			},
			// Select2
			{
				_css: ['./src/assets/select2/css/select2.css'],
				_js: [
					'./src/assets/select2/js/select2.js',
					'./src/assets/select2/js/i18n/ru.js'
				]
			},
			// Bootstrap ( Dist )
			{
				_js: ['./src/assets/bootstrap/js/bootstrap.js'],
				_css: ['./src/assets/bootstrap/css/bootstrap.css']
			},
			/*/ Bootstrap ( Src )
			{
				js: ['./src/assets/bootstrap/js/bootstrap.js'], //dist
				sass: ['./src/assets/bootstrap/scss/bootstrap.scss']
			},*/

			/* Own Files */
			{
				less: ['./src/less/main.less'],
				sass: ['./src/sass/main.scss'],
				css: ['./src/css/main.css'],
				babel: ['./src/js/babel.js'],
				js: ['./src/js/script.js']
			}
		],
		less: {
			watch: ['./src/less/**/*.less']
		},
		sass: {
			watch: ['./src/sass/**/*.scss']
		},
		css: {
			watch: ['./src/css/**/*.css'],
			dest: './dist/example',
			concat: 'style.css'
		},
		babel: { build: 'babel.js' },
		js: {
			dest: './dist/example',
			concat: 'script.js'
		},
		_less: { build: '_less.css'},
		_sass: { build: '_sass.css'},
		_css: { build: '_css.css'},
		_babel: { build: '_babel.js'},
		_js: { build: '_js.js'}
	};
	config.src.push({
		less:[],sass:[],css:[],babel:[],js:[],
		_less:[],_sass:[],_css:[],_babel:[],_js:[]
	});
	/* Concat Assets and Own Files */
	config.src.unshift({
		less:		['./build/'+config._less.build],
		sass:		['./build/'+config._sass.build],
		css:		['./build/'+config._css.build],
		babel:		['./build/'+config._babel.build],
		js:	[
			'./build/'+config._js.build,
			'./build/'+config.babel.build
		]
	});
	for (var i in config.src) {
		if (config.src.hasOwnProperty(i)) {
			var keys = Object.keys(config.src[i]);
			for (var j in keys) {
				if (typeof config[keys[j]].src != 'object') config[keys[j]].src = [];
				if (" css less sass".indexOf(keys[j]) > 0) {
					if (typeof config["css"].src != 'object') config["css"].src = [];
					config["css"].src = config["css"].src.concat(config.src[i][keys[j]])
				} else {
					if (" _css _less _sass".indexOf(keys[j]) > 0) {
						if (typeof config["_css"].src != 'object') config["_css"].src = [];
						config["_css"].src = config["_css"].src.concat(config.src[i][keys[j]])
					} else {
						config[keys[j]].src = config[keys[j]].src.concat(config.src[i][keys[j]])
					}
				}
			}
		}
	}
	return config;
};