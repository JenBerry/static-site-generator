/*jshint esversion: 6 */

const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const gulp = require('gulp');
const sass = require('gulp-sass');
const nunjucks = require('gulp-nunjucks');

gulp.task('html',()=>{
	gulp.src('./src/templates/**/*.html')
		.pipe(nunjucks.compile())
		.pipe(gulp.dest('./public/'));
});

gulp.task('styles',()=>{
	gulp.src('./src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers:['last 2 versions', 'ie >= 9', 'android >= 4.4', 'ios >= 7'],
			cascase:false
		}))
		.pipe(gulp.dest('./public/css/'));
});

gulp.task('scripts',()=>{
	gulp.src('./src/js/**/*.js')
		.pipe(babel({
			presets:['env']
		}))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('vendor',()=>{
	gulp.src('./node_modules/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('./public/vendor/'));
});

gulp.task('watch',()=>{
	gulp.watch('./src/sass/**/*.scss',['styles']);
	gulp.watch('./src/templates/**/*.html',['html']);
	gulp.watch('./src/js/**/*.js',['scripts']);
	console.log('watching files for changes');
});

gulp.task('build',['html', 'styles', 'scripts', 'vendor']);

gulp.task('default',['build']);

gulp.task('clean', ()=>{
	gulp.src([
		'./public/vendor/',
		'./public/js/',
		'./public/css',
		'./public/**/*.html'
		])
		.pipe(clean());
});
