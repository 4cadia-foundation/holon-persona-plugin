// generated on 2019-06-25 using generator-chrome-extension 0.7.1
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import {stream as wiredep} from 'wiredep';
import browserify from 'browserify';
import glob from 'glob';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import minifyCSS from 'gulp-minify-css';
import concat from 'gulp-concat';
import buffer from 'vinyl-buffer';

const $ = gulpLoadPlugins();

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    'app/_locales/**',
    '!app/scripts.babel',
    '!app/*.json',
    '!app/*.html',
  ], {
    base: 'app',
    dot: true
  }).pipe(gulp.dest('dist'));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe($.eslint(options))
      .pipe($.eslint.format());
  };
}

gulp.task('lint', lint('app/scripts.babel/**/*.js', {
  env: {
    es6: true
  }
}));


gulp.task('browserify', () => {
  const files = glob.sync('./app/scripts.babel/**/*.js', { dot: true, ignore: ['./app/scripts.babel/chromereload.js']});
  let bundler = browserify({entries: files, cache: {}, extensions: ['.js'], debug: true});
   
  return bundler.transform(babelify)
          .bundle()
          .pipe(source('bundle.js'))
          .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('html',  () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.sourcemaps.init())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
    .pipe($.sourcemaps.write())
    .pipe($.if('*.html', $.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true
    })))
    .pipe(gulp.dest('dist'));
});


gulp.task('locales', () => {
  return gulp.src('app/_locales/**/*')
    .pipe(gulp.dest('dist/_locales'))
});

gulp.task('config', () => {
  return gulp.src('app/config/**/*')
    .pipe(gulp.dest('dist/config'))
});


gulp.task('manifest:dev', () => {
  return gulp.src('app/manifest.json')
    .pipe(gulp.dest('dist'))
});

gulp.task('chromereload', () => {
  return gulp.src('app/chromereload.js')
    .pipe(gulp.dest('dist'))
});

gulp.task('styles', () => {
  return gulp.src('app/styles/**/*.css')
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/styles'))
});



gulp.task('chromeManifest', () => {
  return gulp.src('app/manifest.json')
    .pipe($.chromeManifest({
      buildnumber: true,
      background: {
        target: 'dist/bundle.js',
        exclude: [
          'dist/chromereload.js'
        ]
      }
  }))
  .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
  .pipe($.if('*.js', $.sourcemaps.init()))
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.js', $.sourcemaps.write('.')))
  .pipe(gulp.dest('dist'));
});

gulp.task('icons', function() {
  return gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(gulp.dest('dist/assets/webfonts/'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('watch', ['default'], () => {
  $.livereload.listen();

  gulp.watch([
    'app/*.html',
    'app/images/**/*',
    'app/styles/**/*',
    'app/_locales/**/*.json',
    'app/config/**.json',
    'app/scripts.babel/**/*.js',
  ], ['images', 'html', 'locales', 'manifest:dev', 'lint', 'browserify', 'styles']).on('change', $.livereload.reload);

});

gulp.task('size', () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});


gulp.task('package', function () {
  var manifest = require('./dist/manifest.json');
  return gulp.src('dist/**')
      .pipe($.zip('boilerplate extension-' + manifest.version + '.zip'))
      .pipe(gulp.dest('package'));
});


gulp.task('react:compile', () => {
  const bundler = browserify({
    extensions: ['.js', '.jsx'],
    entries: 'app/ui/index.js'
  });

  return bundler
    .transform('babelify',
      {
        presets: ['@babel/preset-react']
      })
    .bundle()
    .pipe(source('dist/app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'));
});

gulp.task('react:html', function() {
  return gulp.src('app/ui/**/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('default',  ['lint', 'browserify', 'chromereload', 'manifest:dev', 'react:compile' ,'react:html', 'images', 'locales', 'styles', 'config']);
