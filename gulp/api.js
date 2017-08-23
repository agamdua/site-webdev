// Gulp task to copy previously built API docs.
'use strict';

module.exports = function (gulp, plugins, config) {

  const path = plugins.path;
  const filter = require('gulp-filter');
  const rename = plugins.rename;

  function path2GeneratedAPI(p) {
    return plugins.path.resolve(config.repoPath[p], config.relDartDocApiDir);
  }

  const linkToApiHome = `<a href="/api" title="Webdev API reference home">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 24 24" style="display: inline-block; width: 24px; margin-right: 4px;"><g id="surface1"><path style=" " d="M 20 20 L 20 12 L 22 12 L 12 3 L 2 12 L 4 12 L 4 20 C 4 20.601563 4.398438 21 5 21 L 10 21 L 10 14 L 14 14 L 14 21 L 19 21 C 19.601563 21 20 20.601563 20 20 Z "></path></g></svg>
    </a>
  `;

  // Copy (and patch) API docs for each project p specified via --dartdoc
  gulp.task('finalize-api-docs', config.dartdocProj.map(p => `finalize-api-docs-${p}`));

  config.dartdocProj.forEach(p => {
    gulp.task(`finalize-api-docs-${p}`, [`dartdoc-${p}`], () => copyToUnifiedApi(p));
  });

  function copyToUnifiedApi(p) {
    const pkgName = path.basename(config.repoPath[p]);
    const baseDir = path2GeneratedAPI(p);
    const src = [
      `${baseDir}/**`,
    ];
    const indexHtml = filter(`${baseDir}/index.html`, { restore: true });
    const ngContentAstIndex = filter(`${baseDir}/angular.compiler/NgContentAst/index.html`, { restore: true });
    return gulp.src(src, { base: baseDir })
      .pipe(indexHtml)
      .pipe(plugins.replace(/<\/title>/, `$&\n  <base href="/api/${pkgName}/">`, { skipBinary: true }))
      .pipe(indexHtml.restore)

      .pipe(ngContentAstIndex)
      // Patch file; see https://github.com/dart-lang/site-webdev/issues/271
      .pipe(plugins.replace(/(<base href="..)\/..(">)/, '$1$2'))
      .pipe(ngContentAstIndex.restore)

      .pipe(plugins.replace(/<header id="title">/, `$&\n  ${linkToApiHome}`, { skipBinary: true }))

      .pipe(gulp.dest(path.join(config.unifiedApiPath, pkgName)));
  }

};
