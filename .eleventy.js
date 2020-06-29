const pluginSass = require("eleventy-plugin-sass");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPlugin(pluginSass, { watch: ['site/css/*'] });

  eleventyConfig.addHandlebarsHelper("svg", function(value) {
    /* Based on the implementation by @aredridel at https://github.com/npm/handlebars-helper-icon */

    const fs = require('fs');
    const handlebars = require('handlebars');
    const resolve = require('resolve');
    const nameToModule = {};
    const cache = {};

    module.exports = function(name, opts) {

      // We don't want to play relative path games in templates, so all SVGs must
      // be in the projects root image/ directory
      name = "../../images/" + name;

      const mod = nameToModule[name] || (nameToModule[name] = resolve.sync(name, {
        extensions: ['.svg']
      }));

      const content = cache[name] || (cache[name] = fs.readFileSync(mod, 'utf-8'));

      return new handlebars.SafeString(content.toString());
    }

    module.exports.cache = cache;
  });

  return {
    dir: {
      input: "site",
      output: "_build",
      passthroughFileCopy: true
    }
  }
};
