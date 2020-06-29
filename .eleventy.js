// Declare configOptions so we can use these before returning
const configOptions = { dir: { input: "site", output: "_build", passthroughFileCopy: true }};

// Call 11ty plugins
const pluginSass = require("eleventy-plugin-sass");

module.exports = function(eleventyConfig) {

  // Move input directory images, but not the favicons directory
  const imgDir = configOptions.dir.input + "/images/[!favicons]*";
  eleventyConfig.addPassthroughCopy(imgDir);

  // Move input directory favicons to the output root
  const faviconsDir = configOptions.dir.input + "/images/favicons";
  eleventyConfig.addPassthroughCopy({[faviconsDir]: "./"});

  // Compile Sass
  eleventyConfig.addPlugin(pluginSass, { watch: [configOptions.dir.input + '/css/*'],
                                         outputDir: configOptions.dir.output + '/css' });

  // Add SVG Handlebars Helper
  eleventyConfig.addHandlebarsHelper("svg", function(name) {
    /* Based on the implementation by @aredridel
       at https://github.com/npm/handlebars-helper-icon
    */

    const fs = require('fs');
    const handlebars = require('handlebars');

    const file = configOptions.dir.input + "/images/" + name;
    const content = fs.readFileSync(file, 'utf-8');

    return new handlebars.SafeString(content.toString());
  });

  return configOptions;
};
