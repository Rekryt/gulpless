# Gulp & Css+Sass+Less & Js+Babel & BrowserSync

How to install:
```
npm install gulp-cli -g #if not exist

git clone https://github.com/Rekryt/gulpless.git gulpless
cd gulpless
rm -rf .git #optional

npm install
```

How to use:
```bash
gulp
```

Setting a config in gulp/config.js file:
- **example.rekryt.ru** - proxy host for BrowserSync
- **"templates/example" and "./dist/example"** - serveStatic route for work with local css files instead of the remote files
```javascript
const config = {
	production: false,
	proxy: 'http://example.rekryt.ru',
	https: false,
	serveStatic: [
		{ route: "templates/example", dir: "./dist/example" }
	],
	src: [
		/* Assets */
		// jquery 3.5.1
		{
			_js: ['./src/assets/jquery-3.5.1.js']
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
```

- https://nodejs.org/en/
- https://www.browsersync.io/docs/gulp
