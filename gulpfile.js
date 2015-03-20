var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');
var ngannotate = require('gulp-ng-annotate');
var jshint = require('gulp-jshint');
var babel = require("gulp-babel");

var paths = {
    sass: ['./www/scss/**/*.scss'],
    js: [ './www/js/app/**/*.js' ],
    root: './www'
};

gulp.task('lint', function() {
  return gulp.src(paths.js)
      .pipe(jshint({ eqnull: true, esnext: true, node: true, browser: true, predef: [ 'angular' ] }))
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'));
});

gulp.task('browserify', function() {
  return gulp.src([ paths.root + '/js/app/index.js' ])
      .pipe(sourcemaps.init())
      .pipe(browserify())
      .pipe(babel())
      .pipe(ngannotate())
      .pipe(rename('app.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.root + '/js'));
});

gulp.task('sass', function(done) {
  gulp.src(paths.root + '/scss/app.scss')
    .pipe(sass())
    .pipe(gulp.dest(paths.root + '/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.root + '/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, [ 'sass' ]);
  gulp.watch(paths.js, [ 'lint', 'browserify' ]);
});

gulp.task('compile', [ 'sass', 'browserify' ]);

gulp.task('default', [ 'compile', 'watch' ]);

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
