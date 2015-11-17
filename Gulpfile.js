var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var jshint = require("gulp-jshint");
var less = require("gulp-less");
var minifyCSS = require("gulp-minify-css");
var prefix = require("gulp-autoprefixer");
var del = require("del");

gulp.task("clean", function (done) {
  del(["dist"], done);
});

gulp.task("test", function () {
  return gulp.src([
    "app/scripts/**/*.js",
    "!app/scripts/vendor/**/*.js"
  ])
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(jshint.reporter("fail"));
});

gulp.task("scripts",
  gulp.series("test", function () {
    return gulp.src([ "app/scripts/vendor/**/*.js", "app/scripts/**/*.js"])
      .pipe(concat("main.min.js"))
      .pipe(uglify())
      .pipe(gulp.dest("dist"));
  })
);

gulp.task("styles", function () {
  return gulp.src("app/styles/main.less")
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(prefix())
    .pipe(gulp.dest("dist"));
});

