const gulp = require('gulp');
const babel = require('gulp-babel');
const $ = require('gulp-load-plugins')();

gulp.task('styles:sass', ()=>{
  var sass = require('gulp-ruby-sass');
  var concat = require('gulp-concat');
   sass(['lib/styles/**/*.scss'],{
      style: 'expanded',
      precision: 10
      })
  .on('error', console.error.bind(console))
  .pipe(gulp.dest('dist/styles'))
  .pipe($.size({title:'dist/styles'}));
});
gulp.task('styles', ['styles:sass']);

gulp.task('build',()=>{
	return gulp.src("lib/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"))
    .pipe(gulp.dest('../joywok-forms-chorus/node_modules/jw-form/dist/'));
})
gulp.task('default',['styles','build'],()=>{
	gulp.watch('lib/**/*.js',['build'])
})