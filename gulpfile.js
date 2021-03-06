/* eslint-disable */
var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var autoPrefixer = require('gulp-autoprefixer');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');

gulp.task('post-css',function(){
    gulp.src(['src/styles/main.pcss'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(postcss([
          require('postcss-nested'),
          require('postcss-import'),
          require('autoprefixer'),
          require('postcss-short'),
          cssnano,
        ]))
        .pipe(rename({extname: '.css'}))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('public'))
});

// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server"]);

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", ["webpack:build-dev", 'post-css'], function() {
  gulp.watch(["src/**/*.js"], ["webpack:build-dev"]);
  gulp.watch(["src/**/*.pcss"], ["post-css"]);
});

// Production build
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", ['copy', 'post-css'], function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task('copy', function() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./public'));
})

gulp.task("webpack:build-dev", ['copy'], function(callback) {
  // run webpack
  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});
