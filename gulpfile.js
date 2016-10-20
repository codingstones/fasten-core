const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', function(){
  return gulp.src('src/index.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});
