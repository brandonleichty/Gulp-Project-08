'use strict';

//
// Dependancies
//

const del      = require('del');
const gulp     = require('gulp');
const sass     = require('gulp-sass');
const concat   = require('gulp-concat');
const uglify   = require('gulp-uglify');
const rename   = require('gulp-rename');
const connect  = require('gulp-connect');
const imagemin = require('gulp-imagemin');
const maps     = require('gulp-sourcemaps');



// gulp scripts
//
// Concatenates, minifies, and copies all of the project’s JavaScript files into an all.min.js
// file that is then copied to the dist/scripts folder.

gulp.task('scripts', () => {
  return gulp.src('src/**/*.js')
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});


// gulp styles
//
// Compiles the project’s SCSS files into CSS, then concatenates and minifies into an all.min.css
// file that is then copied to the dist/styles folder.

gulp.task('styles', ['compileSass'], () => {
  return gulp.src('src/sass/global.scss')
  .pipe(concat('all.min.scss'))
  .pipe(maps.init())
  .pipe(sass())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/styles'));
});


// gulp compileSass
//
// Compiles all scss into css and places corresponding files into the src/css folder.

gulp.task('compileSass', () => {
  return gulp.src('src/sass/global.scss')
  .pipe(sass())
  .pipe(gulp.dest('src/css'));
});


// gulp images
//
// Optimizes the size of the project’s JPEG and PNG files, and then copy those
// optimized images to the dist/content folder.

gulp.task('images', () => {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'))
});


// gulp serve
//
// Serves the project using a local web server. Looks in the src folder for the index.html file.

gulp.task('serve', () =>  {
  connect.server({
    root: 'src',
    livereload: true
  });
});
