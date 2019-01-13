'use strict';
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const mqpacker = require('css-mqpacker');
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const rollup = require('gulp-better-rollup');
const sourcemaps = require('gulp-sourcemaps');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel'); 

gulp.task('style', function () {
  gulp.src('./development/css/sass/style-up.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'last 1 version',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Opera versions',
          'last 2 Edge versions'
        ]
      }),
      mqpacker({ sort: true })
    ]))
    .pipe(gulp.dest('./static/css'))
    .pipe(server.stream())
    .pipe(minify())
    .pipe(rename('style-up.min.css'))
    .pipe(gulp.dest('./static/css'));
});

gulp.task('scripts', function () {
  return gulp.src('./development/js/main.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    // note that UMD and IIFE format requires
    .pipe(rollup({
      plugins: [
        // resolve node_modules
        resolve({ browser: true }),
        // resolve commonjs imports
        commonjs(),
        // use babel to transpile into ES5
        babel({
          babelrc: false,
          exclude: 'node_modules/**',
          presets: [
            ['env', { modules: false }]
          ],
          plugins: [
            'external-helpers',
          ]
        })
      ]
    }, 'iife'))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('./static/js'));
});

gulp.task('copy-html', function () {
  return gulp.src('./development/*.html')
    .pipe(gulp.dest('./static'))
    .pipe(server.stream());
});

gulp.task('copy', ['copy-html', 'scripts', 'style'], function () {
  return gulp.src([
    './development/images/**',
    './development/css/*.*'
  ], { base: './development' })
    .pipe(gulp.dest('static'));
});

gulp.task('clean', function () {
  return del('./static');
});

gulp.task('js-watch', ['scripts'], function (done) {
  server.reload();
  done();
});

gulp.task('serve', ['assemble'], function () {
  server.init({
    server: './static',
    notify: false,
    open: true,
    port: 3502,
    ui: false
  });
  gulp.watch('./development/*.html', ['copy-html']);
  gulp.watch('./development/js/**/*.js', ['js-watch']);
  gulp.watch('./development/css/sass/**/*.{scss,sass}', ['style']);
});

gulp.task('assemble', ['clean'], function () {
  gulp.start('copy', 'style');
});

gulp.task('build', ['assemble']);

