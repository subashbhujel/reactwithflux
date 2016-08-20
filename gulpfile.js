"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // runs a local dev server
var open = require('gulp-open'); // open a file in web brower
var browserify  = require('browserify'); // Bundle JS
var reactify = require('reactify'); // Transforms React Jsx -> Js
var source = require('vinyl-source-stream'); // use conventional text streams with gulp
var concat = require('gulp-concat'); //concats file

// config setting for localhost
var config = {
	port:9005,
	devBaseUrl: 'http://localhost',
	paths:{
		html:'./src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
		],
		dist:'./dist',
		mainJs: './src/main.js'
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

// copies html files to sources
gulp.task('js',function(){
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error',console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist+'/scripts'))
		.pipe(connect.reload());
});

// concats css files to sources
gulp.task('css',function(){
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist+'/css'));
});	

// concats css files to sources
gulp.task('images',function(){
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist+'/images'))
		.pipe(connect.reload());
	
	//publish favicon
	gulp.src('.src/favicon.ico')
		.pipe(gulp.dest(config.paths.dist));
});		

// Watches for any changes in html file and refreshes the page
gulp.task('watch',function(){
	gulp.watch(config.paths.html,['html'])
	gulp.watch(config.paths.js,['js'])
});



// Default task that will run when 'gulp' is run from git bash
gulp.task('default',['html','js','css','images','open','watch']);