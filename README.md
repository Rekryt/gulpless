# Gulp & Less & BrowserSync


How to install:
```
git clone https://github.com/Rekryt/gulpless.git .
rm -rf .git #optional
npm install
```

How to install gulp:
```
npm install gulp-cli -g
npm install gulp -D
```

Setting a config in gulpfile.js file:
- **example.rekryt.ru** - proxy host for BrowserSync
- **"templates/example" and "./dist/example"** - serveStatic route for work with local css files instead of the remote files
```javascript
const config = {
	proxy: 'example.rekryt.ru',
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
			css: ['./src/assets/select2/css/select2.css',],
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
	},
	serveStatic: [
		{ route: "templates/example", dir: "./dist/example" }
	]
};
```

How to use:
```bash
gulp
```

- https://nodejs.org/en/
- https://www.browsersync.io/docs/gulp
