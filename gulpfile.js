'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var react = require('gulp-react');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');

var config = require('./config/gulp');
var paths = config.paths

var nodemon_instance;

gulp.task('jsx-compile', function() {
	return gulp.src(paths.in.jsx)
		.pipe(react())
		.pipe(gulp.dest(paths.out.build_js));
});

gulp.task('copy-js', function() {
	return gulp.src(paths.in.js)
		.pipe(gulp.dest(paths.out.build_js));
});

gulp.task('app-compile', ['jsx-compile', 'copy-js'], function() {
	return browserify(paths.in.app)
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest(paths.out.public_js));
});

gulp.task('sass-compile', function() {
	return gulp.src(paths.in.sass)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.out.public_css));
});

gulp.task('install', ['app-compile', 'sass-compile']);

gulp.task('nodemon', function() {
	if(!nodemon_instance)
		nodemon_instance = nodemon({ 
			script: 'server.js', 
			nodeArgs: ['--harmony-generators', '--debug'],
			watch: '__manual_watch__',
			ext: '__manual_watch__'});
	else
		nodemon_instance.emit('restart');
});

gulp.task('watch', function() {
	gulp.watch(paths.in.jsx, ['app-compile']);
	gulp.watch(paths.in.sass, ['sass-compile']);
	gulp.watch(paths.toWatch, ['nodemon']);
});

gulp.task('dev', ['install', 'watch', 'nodemon']);