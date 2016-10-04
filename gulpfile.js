/* eslint-disable */
var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');

gulp.task('sass',function(){
    gulp.src(['src/styles/main.scss'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public'))
});

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
          require('doiuse')({
            browsers: [
              'ie >= 10',
              '> 1%'
            ],
            ignoreFiles: ['**/_normalize.pcss'],
            onFeatureUsage: function (usageInfo) {
              console.log(usageInfo.message)
            }
          }),
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

gulp.task("webpack-dev-server", ['copy'], function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = "eval";
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath: myConfig.output.publicPath,
    contentBase: myConfig.output.path,
    stats: {
      colors: true
    },
    hot: true,
    inline: true,
    historyApiFallback: {
      index: 'index.html'
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
});
