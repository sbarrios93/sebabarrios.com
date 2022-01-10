const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pageAssetPlugin = require("eleventy-plugin-page-assets");
const markdownIt = require("markdown-it");
const tm = require("markdown-it-texmath");
const shikiTwoslash = require("eleventy-plugin-shiki-twoslash")



module.exports = function (eleventyConfig) {
	// Layout aliases
	eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
	eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

	//
	eleventyConfig.addPlugin(shikiTwoslash, { theme: "night-owl" });
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(pageAssetPlugin, {
		mode: "directory",
		recursive: true,
		postsMatching: "**/*.{md,html}",
		assetsMatching: "*.png|*.jpg|*.gif|*.svg",
	});

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
		}).toFormat("MMMM d, yyyy");
	});

	// Markdown Libraries with MarkdownIT // TODO:
	let markdownLibrary = markdownIt({
		html: true,
		linkify: true,
		typographer: true,
	});

	markdownLibrary.use(tm, {
		engine: require("katex"),
		delimiters: "brackets",
	});

	eleventyConfig.setLibrary("md", markdownLibrary);

	return {
		dir: { input: "src", output: "_site" },
	};
};
