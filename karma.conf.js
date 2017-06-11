let webpackConfig = require('./webpack.config.js')
delete webpackConfig.entry

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: ['test/index.js'],  // entry file for all our tests
    // we will pass the entry file to webpack for bundling.
    preprocessors: {
      'test/index.js': ['webpack']
    },
    webpack: webpackConfig,  // use the webpack config
    webpackMiddleware: {
      noInfo: true  // avoid walls of useless text
    },
    singleRun: true
  })
}
