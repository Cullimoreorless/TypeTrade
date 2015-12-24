var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');

gulp.task('scripts', function() {
  var tsResult = gulp.src(['scripts/*.ts', 'scripts/**/*.ts'])
    .pipe(ts({
        declarationFiles: true,
        noExternalResolve: true,
        noImplicitAny: false,
        out: 'main.js'
      }));
 
  return merge([
    tsResult.dts.pipe(gulp.dest('release/definitions')),
    tsResult.js.pipe(gulp.dest('release/releasejs'))
    ]);
});

gulp.task('scriptsEmitWithError', function() {
  var tsResult = gulp.src(['scripts/*.ts', 'scripts/**/*.ts'])
    .pipe(ts({
        declarationFiles: true,
        noExternalResolve: true,
        noImplicitAny: false,
        noEmitOnError:false,
        out: 'main.js'
      }));
 
  return merge([
    tsResult.dts.pipe(gulp.dest('release/definitions')),
    tsResult.js.pipe(gulp.dest('release/releasejs'))
    ]);
});

 
gulp.task('watch', function () {
  gulp.watch('*.ts', ['scripts']);
});