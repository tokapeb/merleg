/**
 * USAGE
 *
 * For the first time run `npm install`. This installs the node modules needed
 * from the 'package.json' file.
 *
 * Once you have installed the node modules, you can use the following commands:
 *  `gulp`
 *    this will fire the default task, creating a minified css
 *    (equals to `gulp less`).
 *
 *  `gulp watch`
 *    this will watch for changes in the less files, and crates a minified css.
 * 
 * If you call the above command with the `--debug` option at the end, the css
 * output won't be minified. It also will have the sourcemap written in the
 * file. If you only would like a non-minified css without sourcemap, pass the
 * `--nosourcemap` option as well.
 * When using the `--debug` option, remember to compile a minified version of
 * the css before committing.
 */

(function() {
  "use strict"

  var styles = {
    log: {format: ['normal'], parameters: ['normal']},
    info: {format: ['cyan'], parameters: ['cyan']},
    warn: {format: ['magenta'], parameters: ['magenta']},
    error: {format: ['red'], parameters: ['red', 'bright']}
  };

  var gulp = require('gulp');
  var less = require('gulp-less');
  var gulpif = require('gulp-if');
  var args = require('yargs').argv;
  var sourcemaps = require('gulp-sourcemaps');
  var ttycolor = require('ttycolor')();
  var ttycolor_revert = ttycolor.defaults(styles);
  var inject = require('gulp-inject-string');
  var autoprefixer = require('gulp-autoprefixer');

  var paths = {
    less: ['../less/merleg.less'],
    lessAll: '../less/**/*.less',
    dest: '../css'
  };

  function handleError(err) {
    console.error('----------------------------------------\n'
        + '%s\n----------------------------------------', err);
    this.emit('end');
  }

  gulp.task('less', function() {
    return gulp.src(paths.less)
      .pipe(gulpif(args.debug,gulpif(!args.nosourcemap,sourcemaps.init())))
      .pipe(less({compress: !args.debug}).on('error', handleError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
       }))
      .pipe(gulpif(args.debug,gulpif(!args.nosourcemap,sourcemaps.write())))
      .pipe(inject.prepend('/* Created: ' + Date() + ' */\n'))
      .pipe(gulp.dest(paths.dest));
  });

  gulp.task('watch', ['less'], function() {
    gulp.watch(paths.lessAll, ['less']);
  });

  gulp.task('default', ['less']);
})();