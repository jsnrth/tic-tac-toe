var bower = require('gulp-bower');
var browserify = require('browserify');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var react = require('gulp-react');
var rimraf = require('gulp-rimraf');
var runSequence = require('run-sequence');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

gulp.task('clean', function(){
    return gulp.src(['tmp/*', 'dist/*'], {read: false})
        .pipe(rimraf());
});

var bower = require('gulp-bower');

gulp.task('bower', function() {
  return bower();
});

gulp.task('build:jsx', function(){
    return gulp.src('app/js/*.jsx')
        .pipe(react())
        .pipe(uglify())
        .pipe(gulp.dest('./tmp/js'));
});

gulp.task('build:js', function(){
    return gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./tmp/js'));
});

gulp.task('build:main', function(){
    return browserify('./tmp/js/main.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build:html', function(){
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function(callback){
    return runSequence(
        'clean',
        'bower',
        ['build:jsx', 'build:js'],
        'build:main',
        'build:html',
        callback);
});

gulp.task('test', function(){
    return gulp.src('test/**/*test.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});
