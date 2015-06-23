'use strict';
var root = require('path').normalize(__dirname + '/..');

module.exports = {
	paths: {
		'in': {
			sass: root + '/app/client/scss/*.scss',
			jsx: root + '/app/client/js/**/*.jsx',
			js: root + '/app/client/js/**/*.js',
			app: root + '/build/app.js'
		},
		out: {
			build_js: root + '/build',
			public_js: root + '/public/js',
			public_css: root + '/public/css'
		},
		toWatch: [root + '/app/**/*.js', root + '/config/*.js', root + '/server.js']
	}
}