var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');

gulp.task('css', function(){
  return gulp.src('node_modules/bulma/bulma.sass')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build'))
});

gulp.task('css', function(){
  return gulp.src('node_modules/bulma-divider/bulma-divider.min.css')
    .pipe(gulp.dest('build'))
});

gulp.task('css', function(){
  return gulp.src('node_modules/bowser/bowser.min.js')
    .pipe(gulp.dest('build'))
});

gulp.task('default', [ 'css' ]);
