var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    merge = require('merge-stream'),
    minify = require('gulp-minify'),
    browserSync = require('browser-sync').create();

//Таск на стили CSS, SASS
function styles() {
    const cssStream = gulp.src("src/css/**/*.css")
        .pipe(concat('cssFiles.css'))

    const scssStream = gulp.src("src/scss/**/*.scss")
        .pipe(sass())
        .pipe(concat('scssFiles.scss'))

    const mergeStream = merge(cssStream, scssStream)
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('all.css'))
        .pipe(autoprefixer())
        .pipe(cleanCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream());

    return mergeStream
}

//Таск на скрипты JS
function scripts() {
    return gulp.src("src/js/*.js")
        .pipe(concat("scripts.js"))
        .pipe(minify())
        .pipe(gulp.dest("assets/js"))
        .pipe(browserSync.stream());
}


function watcher() {
    gulp.watch(['./src/css/**/*.css', './src/scss/**/*.scss'], styles)
    gulp.watch('./src/js/**/*.js', scripts);
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    browserSync.reload();
}

// gulp.task('sprite', gulp.series(sprite))
gulp.task('callback', gulp.series(watcher));