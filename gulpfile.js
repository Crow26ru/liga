const gulp = require(`gulp`);
const plumber = require(`gulp-plumber`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const server = require(`browser-sync`).create();
const rename = require(`gulp-rename`);
const del = require(`del`);
const uglify = require(`gulp-uglify`);
const svgstore = require(`gulp-svgstore`);
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const objectFit = require(`postcss-object-fit-images`);
const cssnano = require('cssnano');
const cssimport = require("postcss-import");
const gcmq = require('gulp-group-css-media-queries');
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const critical = require('critical').stream;

const config = {
  dist: `build`,
  src: `src`,
  fonts: `src/fonts/**/*.{woff,woff2}`,
  img: `src/img/**/*.{png,jpg,webp,svg}`,
  html: `src/*.html`,
  libs: `src/libs/**/*.{js,css}`,
  ieFallback: {
    src: `src/css/blocks/ie-fallback.css`,
    dist: `build/css`,
    min: `ie-fallback.min.css`
  },
  css: {
    src: `src/css/style.css`,
    watch: `src/css/**/*.css`,
    dist: `build/css`,
    min: `style.min.css`
  },
  sprite: {
    src: [
      'src/img/icons/*.svg',
      'src/img/logos/*.svg'
    ],
    dist: `build/img/sprite`,
    name: `sprite.svg`
  },
  js: {
    src: [
      'src/js/init-css-vars-polyfill.js',
      'src/js/color-theme-change.js',
      'src/js/header.js',
      'src/js/vh-mobile.js',
      'src/js/projects-slider.js',
      'src/js/thanks-slider.js',
      'src/js/companies-slider.js',
      'src/js/bigger-content.js',
      'src/js/scroll-header.js',
      'src/js/ie-styles-fallback.js',
      'src/js/frame.js',
      'src/js/contacts-map.js',
      'src/js/project-logistics-slider.js',
      'src/js/map.js',
    ],
    watch: `src/js/**/*.js`,
    mode: `iife`,
    dist: `build/js/`
  },
  svg: {
    src: `src/img/*.svg`,
    dist: `build/img`
  }
};

gulp.task(`clean`, function () {
  return del(config.dist);
});

gulp.task(`copy`, function () {
  return gulp
    .src([config.fonts, config.libs, config.svg.src, config.img], {
      base: config.src
    })
    .pipe(gulp.dest(config.dist));
});

gulp.task(`sprite`, () => {
  return gulp
    .src(config.sprite.src)
    .pipe(
      svgstore({
        inlineSvg: true
      })
    )
    .pipe(rename(config.sprite.name))
    .pipe(gulp.dest(config.sprite.dist));
});

gulp.task(`copyHtml`, () => {
  return gulp
    .src(config.html)
    .pipe(posthtml([
      include()
    ]))
    // .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.dist));
});

gulp.task(`scripts`, () => {
  return gulp
    .src(config.js.src)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.js.dist));
});

gulp.task(`style`, function () {
  return gulp
    .src(config.css.src)
    .pipe(plumber())
    .pipe(postcss([
      cssimport(),
      objectFit(),
      autoprefixer(),
    ]))
    .pipe(gcmq())
    .pipe(gulp.dest(config.css.dist))
    .pipe(postcss([
      cssnano()
    ]))
    .pipe(rename(config.css.min))
    .pipe(gulp.dest(config.css.dist))
    .pipe(server.stream());
});

gulp.task(`ieFallback`, function () {
  return gulp
    .src(config.ieFallback.src)
    .pipe(plumber())
    .pipe(postcss([
      cssimport(),
      objectFit(),
      autoprefixer(),
    ]))
    .pipe(gcmq())
    .pipe(gulp.dest(config.ieFallback.dist))
    .pipe(postcss([
      cssnano()
    ]))
    .pipe(rename(config.ieFallback.min))
    .pipe(gulp.dest(config.ieFallback.dist))
    .pipe(server.stream());
});

gulp.task('critical', function () {
  return gulp.src('build/*.html')
    .pipe(critical({extract: true, inline: true}))
    .pipe(gulp.dest(config.dist));
});

gulp.task(`build`, gulp.series(
  `clean`,
  `copy`,
  `copyHtml`,
  `style`,
  `critical`,
  `ieFallback`,
  `scripts`,
  (done) => done())
);

gulp.task(`serve`, async function () {
  server.init({
    server: config.dist,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch(config.css.watch, gulp.series(`style`, `ieFallback`)).on(`change`, server.reload);
  gulp.watch(config.html, gulp.series(`copyHtml`)).on(`change`, server.reload);
  gulp.watch(config.js.watch, gulp.series(`scripts`)).on(`change`, server.reload);
});
