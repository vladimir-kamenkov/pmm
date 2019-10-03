'use strict';

// connections
var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

// paths
var path = {
    build: {
        js: 'assets/js/main.min.js',
        css: 'assets/css/main.min.css'
    },
    src: {
        js: 'assets/main.js',
        style: 'assets/main.scss'
    },
    watch: {
        js: 'assets/js/*.js',
        style: 'assets/scss/**/*.scss'
    }
};

// configs
var config = {
    server: {
        baseDir: "./"
    },
    //tunnel: true,
    host: 'localhost',
    port: 3000
};

//build
function js(){
    return gulp
        .src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());
}

function css(){
    return gulp
        .src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
}

//watch
gulp.task('watch', function(){
    gulp.watch(path.watch.style, css);
    gulp.watch(path.watch.js, js);
});


gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('build', gulp.parallel(js, css));

gulp.task('default', gulp.parallel('build', 'webserver', 'watch'));