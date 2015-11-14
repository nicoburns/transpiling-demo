
// -----------------------------------------------------------------------------------
// NPM Dependencies
// -----------------------------------------------------------------------------------

// Gulp and core gulp plugins
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');

// Gulp sourcemap support
var sourcemaps = require('gulp-sourcemaps');

// Browserify and related plugins
var browserify = require('browserify');
var watchify   = require('watchify');
var babelify   = require('babelify');


// -----------------------------------------------------------------------------------
// Configuration data (used below)
// -----------------------------------------------------------------------------------

var config = {
  browserify: {

    // Each of these files results in a transpiled javascript file
    files: [
      {src: 'src/arrow.js', dest: 'dist/arrow.js'},
      {src: 'src/react.js', dest: 'dist/react.js'},
      {src: 'src/app/index.js', dest: 'dist/app.js'},
    ]
    ,

  },
  // Could put further configuration here, e.g. for SASS compilation
}


// -----------------------------------------------------------------------------------
// Browserify / Babel setup
// -----------------------------------------------------------------------------------

function createBrowserifyObjects(rootFile, destinationDirectory) {

  // Extract filename and directory from combined destination path
  var parts = rootFile.dest.split('/');
  var destinationName = parts.pop();
  var destinationDirectory = parts.join('/');

  // Create file-watching enabled Browserify bundler object:
  //   1. Create Browserify object, passing in the path of the top-level source file
  //   2. Add 'Babelify' transform to Browserify object configuration
  //   3. Wrap Browserify object with Watchify to enable recompiling on file change.
  var bundler = watchify(
    browserify('./' + rootFile.src, {debug: true}).transform(babelify)
  );

  var bundle = function () {

    // Logging to console
    console.log('-> bundling...');
    var time = Date.now();


    bundler.bundle()

      // Add simple error handling
      .on('error', function(err) { console.error(err); this.emit('end'); })

      // Convert node stream to 'vinyl stream' (gulp's stream format)
      // passing in filename to use when writing file
      .pipe(source('./' + destinationName))
      .pipe(buffer())

      // Load and write sourcemaps to vinyl virtual filesystem
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./', {sourceMappingURLPrefix: '/' + destinationDirectory}))

      // Output transpiled file and sourcemap to actual filesystem
      .pipe(gulp.dest('./' + destinationDirectory));


    // Loggined to console
    time = Date.now() - time;
    console.log('Success: Bundled background.js in ' + time + 'ms');
  }

  return {
    bundler: bundler,
    bundle:  bundle
  }
}

function compileFile(file, watch) {
  var browserifyObjects = createBrowserifyObjects(file);

  var bundler  = browserifyObjects.bundler;
  var rebundle = browserifyObjects.bundle;

  if (watch) {
    bundler.on('update', function() { rebundle(); });
  }
  rebundle();
}

function watch(file) {
  return compileFile(file, true);
};

gulp.task('build', function() { return config.browserify.files.map(compileFile) });
gulp.task('watch', function() { return config.browserify.files.map(watch); });

gulp.task('default', ['watch']);