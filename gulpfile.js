var harp        = require('harp');
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

/**
 * Copy assets from bower.
 */
gulp.task('copy-js', function() {
  gulp.src([
    // Include js files here. e.g. 'file1.js', 
  ]).pipe(gulp.dest('./public/static/js'));
});

gulp.task('copy-fonts', function() {
  gulp.src([
    // Include font files here, i.e.
    // './bower_components/font-awesome/fonts/**/*.{ttf,woff,woff2,eot,svg}',
  ]).pipe(gulp.dest('./public/static/fonts'));
});

/**
 * Serve the Harp Site from the src directory
 */
gulp.task('serve', function () {
  harp.server(__dirname, {
    port: 9000
  }, function () {
    browserSync({
      proxy: "localhost:9000",
      open: false,
      // Hide annoying notifcations
      notify: {
        styles: ['opacity: 0', 'position: absolute']
      }
    });
    // Watch for style changes, load dynamically
    gulp.watch(["**/*.css", "**/*.sass", "**/*.scss"], function () {
      reload("main.css", {stream: true});
    });
    // Watch for content changes, reload entire page
    gulp.watch(["**/*.html", "**/*.jade", "**/*.ejs", "**/*.js", "**/*.json", "**/*.md"], function () {
      reload();
    });
  })
});

/**
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['copy-js', 'copy-fonts', 'serve']);
