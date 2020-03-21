var browserify = require('browserify');
var gulp = require('gulp');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sourceFile = './src/js/views/indexView.js';
var destFolder = './bundle/';

var destFile = 'indexBundle.js';

// ---------------------------------------------- Gulp Tasks
gulp.task('browserify', function(){
    return browserify(sourceFile)
    .transform(babelify.configure({
        presets: ["es2015"]
    }))
    .bundle()
    .pipe(source(destFile))
    .pipe(gulp.dest(destFolder));
});

// --------------------------------------- Default Gulp Task
gulp.task('default', function(){
    console.log("It's working!");
});