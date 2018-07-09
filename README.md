# Gulp & Less & BrowserSync

How to install:
```
git clone https://github.com/Rekryt/gulpless.git .
rm -rf .git #optional
npm install
```

Setting a config in gulpfile.js file:
- **example.zone** - proxy host for BrowserSync
- **example-template-route** - serveStatic route for work with local css files instead of the remote files
```javascript
const config = {
  proxy: 'example.zone',
	root: './',
	less: {
		watch: 'less/*.less',
		src: 'less/*.less',
		dest: 'css'
	},
	css: {
		watch: 'css/*.css',
		serveStatic: [{
			route: ['/templates/example-template-route/css'],
			dir: 'css'
		}]
	}
};
```

How to use:
```
gulp
```
