'use strict';


// dependancies


const del      = require('del');
const gulp     = require('gulp');
const sass     = require('gulp-sass');
const concat   = require('gulp-concat');
const eslint   = require('gulp-eslint');
const uglify   = require('gulp-uglify');
const rename   = require('gulp-rename');
const connect  = require('gulp-connect');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const maps     = require('gulp-sourcemaps');


/**
 * gulp scripts
 *
 * Concatenates, minifies, and copies all of the project’s JavaScript files into an all.min.js
 * file that is then copied to the dist/scripts folder. Activates page reload if watch task is running.
 */
gulp.task('scripts', ['eslint'], () => {
  return gulp.src('src/**/*.js')
    .pipe(concat('all.min.js'))
    .pipe(maps.init())
    .pipe(uglify())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(connect.reload());
});


/**
 * gulp eslint
 *
 * javaScript files will be linted using ESLint and if there’s an error, the error
 * will output to the console and the build process will be halted.
 */
gulp.task('eslint', () => {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


/**
 * gulp styles
 *
 * compiles the project’s SCSS files into CSS, then concatenates and minifies into an all.min.css
 * file that is then copied to the dist/styles folder.
 */
gulp.task('styles', ['compileSass'], () => {
  return gulp.src('src/sass/global.scss')
  .pipe(concat('all.min.scss'))
  .pipe(maps.init())
  .pipe(sass())
  .pipe(cleanCSS())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/styles'));
});


/**
 * gulp compileSass
 *
 * compiles all scss into css and places corresponding files into the src/css folder.
 */
gulp.task('compileSass', () => {
  return gulp.src('src/sass/global.scss')
  .pipe(sass())
  .pipe(gulp.dest('src/css'))
  .pipe(connect.reload());
});


/**
 * gulp images
 *
 * optimizes the size of the project’s JPEG and PNG files, and then copy those
 * optimized images to the dist/content folder.
 */
gulp.task('images', ['icons'], () => {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'));
});

gulp.task('icons', () => {
  return gulp.src('src/icons/**/*')
  .pipe(gulp.dest('dist/content/icons'));
});


/**
 * gulp serve
 *
 * serves the project using a local web server. Looks in the src folder for the index.html file.
 * livereload set to true.
 */
gulp.task('serve', ['build'], () =>  {
  connect.server({
    root: 'src',
    livereload: true
  });
});


/**
 * gulp clean
 *
 * deletes all files and folders in the dist folder.
 */
gulp.task('clean', () => {
    return del('dist/**/*');
});


/**
 * gulp watch
 *
 * runs the server task and then watches for any chances to the JavaScript files.
 * if any chances are are made, the "scripts" task is run and the page is reloaded.
 */
gulp.task('watch', ['serve'], () => {
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/sass/**/*.scss', ['compileSass']);
});


/**
 * gulp build
 *
 * Runs the clean task (Deletes all files and folders in the dist folder), and then
 * runs: styles, scripts, and images tasks.
 */
gulp.task('build', ['clean'], () => {
  gulp.start(['styles', 'scripts', 'images']);
});


//default Gulp task. Runs when "gulp" entered into command line. Executes the "build" task

gulp.task('default', ['build']);
