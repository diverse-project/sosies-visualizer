// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

var REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  return Object
    .keys(process.env)
    .filter(function filterHandler(key) { return REACT_APP.test(key); })
    .reduce(function reduceHandler(env, key) {
      env['process.env.' + key] = JSON.stringify(process.env[key]); // eslint-disable-line no-param-reassign
      return env;
    }, {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      // Useful for resolving the correct path to static assets in `public`.
      // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
      // This should only be used as an escape hatch. Normally you would put
      // images into the `src` and `import` them in code to get their paths.
      'process.env.PUBLIC_URL': JSON.stringify(publicUrl)
    });
}

module.exports = getClientEnvironment;
