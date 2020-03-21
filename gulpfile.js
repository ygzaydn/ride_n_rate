var browserify = require('browserify');
var gulp = require('gulp');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var destFolder = './bundle/';



// ---------------------------------------------- Gulp Tasks
gulp.task('index', function(){
    return browserify('./src/js/views/indexView.js')
    .transform(babelify.configure({
        presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('indexBundle.js'))
    .pipe(gulp.dest(destFolder));
});

gulp.task('signup', function(){
    return browserify('./src/js/views/signUpView.js')
    .transform(babelify.configure({
        presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('signUpBundle.js'))
    .pipe(gulp.dest(destFolder));
});

// --------------------------------------- Default Gulp Task

/* gulp.task('default', ['index', 'signup']); */

gulp.task('default', function(){
    console.log("It's working!");
});