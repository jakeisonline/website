// Declare configOptions so we can use these before returning
const configOptions = { dir: { input: "site", output: "_build", passthroughFileCopy: true }};

// Call 11ty plugins
const pluginSass = require("eleventy-sass");

// General project constants
const projectConfig = { stylesDir: "styles", imagesDir: "images", mediaDir: "media" };

module.exports = function(eleventyConfig) {

  // Move input directory images, but not the favicons directory
  const imgDir = configOptions.dir.input + "/" + projectConfig.imagesDir + "/[!favicons]*";
  eleventyConfig.addPassthroughCopy(imgDir);

  // Move input directory favicons to the output root
  const faviconsDir = configOptions.dir.input + "/" + projectConfig.imagesDir + "/favicons";
  eleventyConfig.addPassthroughCopy({[faviconsDir]: "./"});

  // Move input directory media
  const mediaDir = configOptions.dir.input + "/" + projectConfig.mediaDir + "/*";
  eleventyConfig.addPassthroughCopy(mediaDir);

  // Compile Sass
  eleventyConfig.addPlugin(pluginSass, {
    watch: [configOptions.dir.input + '/' + projectConfig.stylesDir + '/**/*'],
    outputDir: configOptions.dir.output + '/' + projectConfig.stylesDir,
    sourcemaps: true
  });

  // Add SVG Handlebars Helper
  eleventyConfig.addHandlebarsHelper("svg", function(fileName) {
    /* Based on the implementation by @aredridel
       at https://github.com/npm/handlebars-helper-icon
    */

    const fs = require('fs');
    const handlebars = require('handlebars');

    const file = configOptions.dir.input + "/" + projectConfig.imagesDir + "/" + fileName + ".svg";
    const content = fs.readFileSync(file, 'utf-8');

    return new handlebars.SafeString(content.toString());
  });

  return configOptions;
};
