var gulp = require('gulp');
var gulpSourcemaps = require('gulp-sourcemaps');
var gulpTypescript = require('gulp-typescript');
var gulpConcat = require('gulp-concat');

var tsconfig = gulpTypescript.createProject('tsconfig.json');
var appDev = 'app';
var appProd = 'public/js';
var vendor = 'public/js/vendor';
var rootProd = 'public';
var viewDev = 'views';
var cssDev = 'stylesheets';
var cssProd = 'stylesheets';

gulp.task('build-ts', function () {
    return gulp.src(appDev + '**/*.ts')
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTypescript(tsconfig))
        .pipe(gulpSourcemaps.write())
        // .pipe(gulpConcat('bundle.js'))
        .pipe(gulp.dest(appProd));
});

gulp.task('build-copy', function(){
    gulp.src(['views' + '**/*.html'])
    .pipe(gulp.dest(rootProd))
    gulp.src([cssDev + '**/*.css'])
    .pipe(gulp.dest(rootProd));
    return gulp.src([viewDev + '**/*.html', viewDev + '**/*.htm'])
    .pipe(gulp.dest(rootProd));
})

gulp.task('vendor', function () {
    gulp.src('node_modules/@angular/**')
        .pipe(gulp.dest(vendor + '/@angular'));
    gulp.src('node_modules/reflect-metadata/**')
        .pipe(gulp.dest(vendor + '/reflect-metadata'));
    gulp.src('node_modules/rxjs/**')
        .pipe(gulp.dest(vendor + '/rxjs'));
    gulp.src('node_modules/systemjs/**')
        .pipe(gulp.dest(vendor + '/systemjs'));
    return gulp.src('node_modules/zone.js/**')
        .pipe(gulp.dest(vendor + '/zone.js'));
});

gulp.task('watch', function () {
    gulp.watch(appDev + '**/*.ts', ['build-ts']);
    gulp.watch(appDev + '**/*.{html,htm,css}', ['build-copy']);
    gulp.watch(appDev + 'node_modules/**', ['vendor']);
});

gulp.task('default', [
    'watch', 
    'build-ts', 
    'build-copy', 
    'vendor'
]);