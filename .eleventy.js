module.exports = function(eleventyConfig) {
  // Return your Object options:
  return {
    dir: {
      input: "content", // Default .
      output: "_site",
      includes: "../_includes", // Relative to dir.input.
      layouts: "../_layouts", // Relative to dir.input.
    }
  }
};