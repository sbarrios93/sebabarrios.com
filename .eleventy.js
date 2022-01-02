const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
	// Layout aliases
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
	eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  //
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.addPassthroughCopy("images");
	eleventyConfig.addPassthroughCopy("admin");

	const { DateTime } = require("luxon");

	// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		return DateTime.fromJSDate(dateObj, {
			zone: "utc",
		}).toFormat("yy-MM-dd");
	});

	eleventyConfig.addFilter("readableDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj, {
			zone: "utc",
		}).toFormat("dd-MM-yy");
	});

	return {
		dir: { input: "src", output: "_site" },
	};
};
