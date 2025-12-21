const gulp = require('gulp')
const stylus = require('gulp-stylus')
const browserSync = require('browser-sync')
const reload = browserSync.reload

gulp.task('browser-sync', function() {
  browserSync.init([
    './style.css',
    './*.php',
    './**/*.php',
    './js/*.js'
  ], {
    proxy: 'localhost/symmetrycode',
    notify: false
  })
})

gulp.task('stylus', function() {
  return gulp.src('./styl/style.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(gulp.dest('./'))
    .pipe(reload({ stream: true }))
})

gulp.task('watch', function() {
  gulp.watch(['./styl/*.styl', './styl/**/*.styl', './styl/**/*.css'], ['stylus'])
})

gulp.task('default', ['stylus', 'watch', 'browser-sync'])