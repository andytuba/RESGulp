var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
	bump = require('gulp-bump');
	zip = require('gulp-zip');
// What happens when you do gulp without any arguments

gulp.task('default', ['clean'], function() {
    gulp.start('chrome', 'safari');
});

//Browser task runs subtasks

gulp.task('chrome', ['chromecss', 'chromejs', 'chromeimg', 'chromemove']);

gulp.task('safari', ['safaricss', 'safarijs', 'safariimg', 'safarimove']);

//Chrome subtasks. They run subsubtasks

gulp.task('chromemove', ['chromemove1', 'chromemove2', 'chromemove3', 'chromemove4']);

gulp.task('chromecss', ['modulecsschrome', 'corecsschrome', 'vendorcsschrome']);

gulp.task('chromejs', ['libjschrome', 'chromejschrome', 'vendorjschrome', 'corejschrome', 'modulesjschrome']);

gulp.task('chromeimg', ['rootimageschrome', 'imagesimageschrome']);

//Safari subtasks

gulp.task('safaricss', ['modulecsssafari', 'corecsssafari', 'vendorcsssafari']);

gulp.task('safarijs', ['libjssafari', 'safarijssafari', 'vendorjssafari', 'corejssafari', 'modulesjssafari']);

gulp.task('safariimg', ['rootimagessafari']);

gulp.task('safarimove', ['safarimove1', 'safarimove2', 'safarimove3', 'safarimove4']);

//This kills the CPU

gulp.task('zipall', ['chromezip', 'safarizip']);

//Chrome Tasks

gulp.task('modulecsschrome', function() {
	return gulp.src('lib/modules/*.css')
   	 	.pipe(minifycss())
   		.pipe(gulp.dest('dist/chrome/modules'))
});

gulp.task('corecsschrome', function() {
	return gulp.src('lib/core/*.css')
   	 	.pipe(minifycss())
   		.pipe(gulp.dest('dist/chrome/core'))
});

gulp.task('vendorcsschrome', function() {
	return gulp.src('lib/vendor/*.css')
   	 	.pipe(minifycss())
   		.pipe(gulp.dest('dist/chrome/vendor'))
});

gulp.task('libjschrome', function() {
	return gulp.src('lib/*.js')
		.pipe(gulp.dest('dist/chrome'))
});

gulp.task('chromejschrome', function() { //loltaskname
	return gulp.src('Chrome/*.js')
		.pipe(gulp.dest('dist/chrome'))
});

gulp.task('vendorjschrome', function() {
	return gulp.src('lib/vendor/*.js')
		.pipe(gulp.dest('dist/chrome/vendor'))
});

gulp.task('corejschrome', function() {
	return gulp.src('lib/core/*.js')
		.pipe(gulp.dest('dist/chrome/core'))
});

gulp.task('modulesjschrome', function() {
	return gulp.src('lib/modules/*.js')
		.pipe(gulp.dest('dist/chrome/modules'))
});

gulp.task('rootimageschrome', function() {
  return gulp.src('Chrome/*.png')
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/chrome'))
});

gulp.task('imagesimageschrome', function() { //yo dog
  return gulp.src('Chrome/images/*.png')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/chrome/images'))
});

gulp.task('chromemove1', function() { //move other stuff that doesn't fit elsewhere
	return gulp.src('lib/core/*.html')
		.pipe(gulp.dest('dist/chrome/core'))
});

gulp.task('chromemove2', function() { 
	return gulp.src('Chrome/*.html')
		.pipe(gulp.dest('dist/chrome'))
});

gulp.task('chromemove3', function() { 
	return gulp.src('package.json')
		.pipe(gulp.dest('dist/chrome'))
});

gulp.task('chromemove4', function() { 
	return gulp.src('Chrome/manifest.json')
		.pipe(gulp.dest('dist/chrome'))
});

// Safari Tasks

gulp.task('modulecsssafari', function() {
	return gulp.src('lib/modules/*.css')
   	 	.pipe(minifycss())
   		.pipe(gulp.dest('dist/safari/modules'))
});

gulp.task('corecsssafari', function() {
	return gulp.src('lib/core/*.css')
   	 	.pipe(minifycss())
   		.pipe(gulp.dest('dist/safari/core'))
});

gulp.task('vendorcsssafari', function() {
	return gulp.src('lib/vendor/*.css')
   	 	.pipe(minifycss())
   		.pipe(gulp.dest('dist/safari/vendor'))
});

gulp.task('libjssafari', function() {
	return gulp.src('lib/*.js')
		.pipe(gulp.dest('dist/safari'))
});

gulp.task('safarijssafari', function() {
	return gulp.src('RES.safariextension/*.js')
		.pipe(gulp.dest('dist/safari'))
});

gulp.task('vendorjssafari', function() {
	return gulp.src('lib/vendor/*.js')
		.pipe(gulp.dest('dist/safari/vendor'))
});

gulp.task('corejssafari', function() {
	return gulp.src('lib/core/*.js')
		.pipe(gulp.dest('dist/safari/core'))
});

gulp.task('modulesjssafari', function() {
	return gulp.src('lib/modules/*.js')
		.pipe(gulp.dest('dist/safari/modules'))
});

gulp.task('rootimagessafari', function() {
  return gulp.src('RES.safariextension/*.png')
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/safari'))
});

gulp.task('safarimove1', function() { //move other stuff that doesn't fit elsewhere
	return gulp.src('lib/core/*.html')
		.pipe(gulp.dest('dist/safari/core'))
});

gulp.task('safarimove2', function() { 
	return gulp.src('RES.safariextension/*.html')
		.pipe(gulp.dest('dist/safari'))
});

gulp.task('safarimove3', function() { 
	return gulp.src('package.json')
		.pipe(gulp.dest('dist/safari'))
});

gulp.task('safarimove4', function() { 
	return gulp.src('RES.safariextension/info.plist')
		.pipe(gulp.dest('dist/safari'))
});

//Zip Tasks

gulp.task('chromezip', function() {
	return gulp.src('dist/chrome/**/*')
		.pipe(zip('chrome.zip'))
		.pipe(gulp.dest('../../../var/www/html'))
});

gulp.task('safarizip', function() {
	return gulp.src('dist/safari/**/*')
		.pipe(zip('safari.zip'))
		.pipe(gulp.dest('../../../var/www/html'))
});

//Other

gulp.task('clean', function(cb) {
    del(['dist/**/*'], cb)
});