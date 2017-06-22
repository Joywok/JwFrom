const gulp = require('gulp');
const babel = require('gulp-babel');
gulp.task('build',()=>{
	return gulp.src("lib/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
})
gulp.task('default',['build'],()=>{
	gulp.watch('lib/**/*.js',['build'])
})