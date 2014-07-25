var gulp = require('gulp');

gulp.task('clean', function(){
    var rimraf = require('gulp-rimraf');
    return gulp.src(['tmp/*', 'dist/*'], {read: false})
        .pipe(rimraf());
});

gulp.task('bower', function() {
    var bower = require('gulp-bower');
    return bower();
});

gulp.task('build:libs', function(){
    var browserify = require('browserify');
    var source = require('vinyl-source-stream');
    return browserify()
        .require('./bower_components/react/react.min.js', {expose: 'react'})
        .bundle()
        .pipe(source('libs.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build:js', function(){
    var browserify = require('browserify');
    var reactify = require('reactify');
    var source = require('vinyl-source-stream');
    var uglifyify = require('uglifyify');
    return browserify({
        entries: ['./app/js/main.js'],
        extensions: ['.jsx']})
        .external('react')
        .transform(reactify)
        .transform(uglifyify)
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build:css', function(){
    var less = require('gulp-less');
    var minify = require('gulp-minify-css');
    var smaps = require('gulp-sourcemaps');
    return gulp.src('./app/css/main.less')
        .pipe(smaps.init())
        .pipe(less())
        .pipe(minify())
        .pipe(smaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:html', function(){
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function(callback){
    var runSequence = require('run-sequence');
    return runSequence(
        ['clean', 'bower'],
        ['build:libs', 'build:js', 'build:css', 'build:html'],
        callback);
});

gulp.task('test', function(){
    var mocha = require('gulp-mocha');
    return gulp.src('test/**/*test.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});
