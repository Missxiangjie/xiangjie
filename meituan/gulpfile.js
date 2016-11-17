// 加载插件

var gulp = require('gulp'),                        // 先把gulp插件加载进来  
    less = require('gulp-less'),                   // less转译成css  
    minify = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

    
gulp.task('move', function () {
	gulp.src(['meituan/src/*.html'])
	.pipe(gulp.dest('meituan/dist'))
})

gulp.task('moveimg', function () {
	gulp.src(['meituan/src/img/*'])
	.pipe(gulp.dest('meituan/dist/img'))
})

gulp.task('less2css', function () {
	gulp.src('meituan/src/less/*.less')
	.pipe(less())  // *.css
	.pipe(gulp.dest('meituan/dist/css'))
	.pipe(rename({suffix:'.min'}))
	.pipe( minify())
	.pipe(gulp.dest('meituan/dist/css'))
})

gulp.task('jsopt', function () {
	gulp.src('meituan/src/js/meituan.js')
	.pipe(concat('main.js'))
	.pipe(gulp.dest('meituan/dist/js'))
	.pipe(rename({suffix: '.min'}))  // main.js => main.min.js
	.pipe(uglify())  //main.min.js
	.pipe(gulp.dest('meituan/dist/js'))
})

gulp.task('watch', ['less2css', 'jsopt', 'move', 'moveimg'], function () {
	gulp.watch(['meituan/src/less/*.less', 'meituan/src/js/*.js'], ['less2css', 'jsopt', 'move', 'moveimg']);
})
    
    


