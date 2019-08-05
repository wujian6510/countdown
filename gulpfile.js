const gulp = require('gulp'),
  sass = require('gulp-sass'),
	watch = require('gulp-watch'),
	cleanCss = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer');

  sass.compiler = require('node-sass');

  gulp.task('baseSass',function(){
    gulp.src('./public/assets/sass/common.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(cleanCss())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public/assets/style/'));
  });

  gulp.task('watch',function(){
    gulp.watch(["public/assets/sass/*.scss","public/assets/sass/**/*.scss"],['baseSass']);
  });

  //全局监测less及html变化实时刷新


  gulp.task('default',['watch']);