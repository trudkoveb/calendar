var gulp = require('gulp'),
sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pxtorem = require('gulp-pxtorem');
var pug = require('gulp-pug');

browserSync = require('browser-sync');
autoprefixer = require('gulp-autoprefixer');
del = require('del');

concat = require('gulp-concat'),
uglifyJs = require('gulp-uglifyjs'),
cssNano = require('gulp-cssnano'),
rename = require('gulp-rename');

gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.sass')
    .pipe(sass())
    .pipe(autoprefixer([
        'last 10 versions'
        ], {
            cascade: true
        }))
    .pipe(pxtorem())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'src'
        }
    });
});

gulp.task('px-rem', function() {
    gulp.src('src/css/**/*.css')
        .pipe(pxtorem())
        .pipe(gulp.dest('src/css'));
});

gulp.task('min-image', () =>
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

gulp.task('pug-html', function buildHTML() {
  return gulp.src('src/views/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('src/'))
});

gulp.task('min-js', function() {
    return gulp.src([
            'src/libs/jquery/dist/jquery.min.js',
            'src/libs/slick/dist/slick.min.js'
        ])
    .pipe(concat('libs.min.js'))
    .pipe(uglifyJs())
    .pipe(gulp.dest('src/js'));
});

gulp.task('min-css', ['sass'] , function() {
    return gulp.src('src/css/style.css')
    .pipe(cssNano())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('src/css'));
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('src/sass/**/*.sass', ['sass', 'min-css']);
    gulp.watch('src/views/*.pug', ['pug-html']);
    gulp.watch('src/js/**/*.js', browserSync.reload);
    gulp.watch('src/**/*.html', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('build', ['clean', 'min-js', 'min-css', 'min-image'], function() {
    var buildCss = gulp.src([
            'src/css/style.min.css'
        ])
    .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('src/js/**/*')
    .pipe(gulp.dest('dist/js'));

    var buildImages = gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'));

    var buildHtml = gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});