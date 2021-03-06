import gulp from 'gulp';
import tsc from 'gulp-typescript';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass( dartSass );

gulp.task('styles', function() {
    return gulp.src('src/sass/**/*.scss') // source files
        .pipe(sass()) // transform
        .pipe(gulp.dest('assets/styles')); // dest folder
});

gulp.task('scripts', function() {
    const tsConfig =  tsc.createProject('tsconfig.json');
    return tsConfig.src() // source files
        .pipe(tsConfig()) // transform
        .pipe(gulp.dest('assets/scripts')); // dest folder
});

gulp.task('scripts:watch', gulp.series('scripts', function(done) {
    gulp.watch('src/typescript/**/*.ts', gulp.series('scripts'));
    done();
}));

gulp.task('styles:watch', gulp.series('styles', function(done) {
    gulp.watch('src/sass/**/*.scss', gulp.series('styles'));
    done();
}));

gulp.task('serve', function(done) {
    const allTask = gulp.parallel('styles:watch', 'scripts:watch');
    allTask();
    done();
});

gulp.task('default', gulp.parallel('styles', 'scripts', function(done) {
    done();
}));