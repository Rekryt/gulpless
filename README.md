# Gulp & Css+Sass+Less & Js+Babel+Webpack & BrowserSync

How to install:
```
mkdir gulpless
cd gulpless

git clone https://github.com/Rekryt/gulpless.git .
rm -rf .git #optional

npm install
```

How to install gulp:
```
npm install gulp-cli -g
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
			webpack: ['./src/js/webpack.js'],
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
	webpack: { build: 'webpack.js' },
	js: {
		dest: './dist/example',
		concat: 'script.js'
	},
	_less: { build: '_less.css'},
	_sass: { build: '_sass.css'},
	_css: { build: '_css.css'},
	_babel: { build: '_babel.js'},
	_webpack: { build: '_webpack.js'},
	_js: { build: '_js.js'}
};
```

How to use:
```bash
gulp
```

- https://nodejs.org/en/
- https://www.browsersync.io/docs/gulp
