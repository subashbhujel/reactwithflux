"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');

// config setting for localhost
var config = {
	port:9005,
	devBaseUrl: 'https://localhost',
	paths:{
		html:'./src/*.html',
		dist:'./dist'
	}
}

// A http server
gulp.task('connect',function(){
	connect.server({
		root:['dist'],
		port:config.port,
		base:config.devBaseUrl,
		livereload:true
	});
});

// Opens the browser
gulp.task('open',['connect'],function(){
	gulp.src('dist/index.html')
		.pipe(open({uri:config.devBaseUrl+':'+config.port+'/'}));
});

// copies html files to sources
gulp.task('html',function(){
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

// Watches for any changes in html file and refreshes the page
gulp.task('watch',function(){
	gulp.watch(config.paths.html,['html'])
});

// Default task that will run when 'gulp' is run from git bash
gulp.task('default',['html','open','watch']);