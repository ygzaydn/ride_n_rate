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

gulp.task('about', function(){
    return browserify('./src/js/views/aboutView.js')
    .transform(babelify.configure({
        presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('aboutBundle.js'))
    .pipe(gulp.dest(destFolder));
});

gulp.task('searchResult', function(){
    return browserify('./src/js/views/searchResultView.js')
    .transform(babelify.configure({
        presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('searchResultBundle.js'))
    .pipe(gulp.dest(destFolder));
});

gulp.task('search', function(){
    return browserify('./src/js/views/searchView.js')
    .transform(babelify.configure({
        presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('searchBundle.js'))
    .pipe(gulp.dest(destFolder));
});

gulp.task('companyRating', function(){
    return browserify('./src/js/views/companyRatingView.js')
    .transform(babelify.configure({
        presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('companyRatingBundle.js'))
    .pipe(gulp.dest(destFolder));
});

gulp.task('companyComment', function(){
    return browserify('./src/js/views/companyCommentView.js')
    .transform(babelify.configure({
        presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('companyCommentBundle.js'))
    .pipe(gulp.dest(destFolder));
});

gulp.task('companies', function(){
    return browserify('./src/js/views/companiesView.js')
    .transform(babelify.configure({
        presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('companiesBundle.js'))
    .pipe(gulp.dest(destFolder));
});

gulp.task('contact', function(){
    return browserify('./src/js/views/contactView.js')
    .transform(babelify.configure({
        presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('contactBundle.js'))
    .pipe(gulp.dest(destFolder));
});

// --------------------------------------- Default Gulp Task

/* gulp.task('default', ['index', 'signup']); */

gulp.task('default', function(){
    console.log("It's working!");
});