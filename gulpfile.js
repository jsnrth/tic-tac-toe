var bower = require('gulp-bower');
var browserify = require('browserify');
var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var mocha = require('gulp-mocha');
var reactify = require('reactify');
var rimraf = require('gulp-rimraf');
var runSequence = require('run-sequence');
var source = require('vinyl-source-stream');
var sourceMaps = require('gulp-sourcemaps');
var uglifyify = require('uglifyify');

gulp.task('clean', function(){
    return gulp.src(['tmp/*', 'dist/*'], {read: false})
        .pipe(rimraf());
});

var bower = require('gulp-bower');

gulp.task('bower', function() {
  return bower();
});

gulp.task('build:libs', function(){
    return gulp.src('./bower_components/react/react.min.js')
        .pipe(gulp.dest('./dist'));
});

gulp.task('build:js', function(){
    return browserify({
        entries: ['./app/js/main.js'],
        extensions: ['.jsx']})
        .transform(reactify)
        .transform(uglifyify)
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build:css', function(){
    return gulp.src('./app/css/main.less')
        .pipe(sourceMaps.init())
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:html', function(){
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function(callback){
    return runSequence(
        'clean',
        'bower',
        ['build:libs', 'build:js', 'build:css', 'build:html'],
        callback);
});

gulp.task('test', function(){
    return gulp.src('test/**/*test.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});
