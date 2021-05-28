const { src,dest,parallel,watch,series } = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const FilesPath = {
    sassFiles : 'sass/*.sass',
    htmlFiles : 'pages/*.pug'
}

const { sassFiles, htmlFiles } = FilesPath;

function htmlTask() {
    return src(htmlFiles)
        .pipe(pug({pretty:true}))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

function sassTask() {
    return src(sassFiles)
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())
}

function assetsTask() {
    return src('assets/**/*')
        .pipe(dest('dist/assets'))
}

function serve() {
    browserSync.init({
        server: {
            baseDir:'./dist'
        }
    })
    watch(sassFiles,sassTask);
    watch(htmlFiles,htmlTask);  
}

exports.sass = sassTask;
exports.html = htmlTask;
exports.assets = assetsTask;
exports.default = series(parallel(htmlTask,sassTask,assetsTask));
exports.serve = series(serve,parallel(htmlTask,sassTask,assetsTask));
