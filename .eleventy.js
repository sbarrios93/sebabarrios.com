const { DateTime } = require("luxon");
const { promisify } = require("util");
const fs = require("fs");
const hasha = require("hasha");
const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);
const execFile = promisify(require("child_process").execFile);
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const elasticlunr = require("elasticlunr");
const fetch = require("node-fetch");

// markdown-it
const markdownIt = require("markdown-it");
var markdownItp = require("markdown-it")();
const mdItContainer = require("markdown-it-container");
const tm = require("./third_party/markdown-it-texmath"); // copied from github:dinhanhthi/markdown-it-texmath

const localImages = require("./third_party/eleventy-plugin-local-images/.eleventy.js");
const CleanCSS = require("clean-css");
const GA_ID = require("./src/_data/metadata.json").googleAnalyticsId;

const categories = require("./src/_data/categories.json");

module.exports = {
  environment: process.env.ELEVENTY_ENV,
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  eleventyConfig.addPlugin(require("eleventy-plugin-nesting-toc"), {
    tags: ["h2", "h3"], // Which heading tags are selected (headings must each have an ID attribute)
    wrapper: "div", // Element to put around the root `ol`
    wrapperClass: "toc toc-common toc-js", // Class for the element around the root `ol`
    headingText: "", // Optional text to show in heading above the wrapper element
    headingTag: "h2", // Heading tag when showing heading above the wrapper element
  });

  if (process.env.ELEVENTY_ENV == "local") {
    eleventyConfig.addPlugin(require("./src/_11ty/optimize-html.js"), {
      devMode: true,
    });
    eleventyConfig.setDataDeepMerge(true);
  } else {
    eleventyConfig.addPlugin(require("./src/_11ty/img-dim.js")); // take too long to build
    eleventyConfig.addPlugin(require("./src/_11ty/json-ld.js"));
    eleventyConfig.addPlugin(require("./src/_11ty/apply-csp.js"));
    eleventyConfig.addPlugin(require("./src/_11ty/optimize-html.js"));
    eleventyConfig.setDataDeepMerge(true);

    // eleventy-plugin-local-images
    eleventyConfig.addPlugin(localImages, {
      distPath: "_site",
      assetPath: "/img/remote",
      selector:
        "img,amp-img,amp-video,meta[property='og:image'],meta[name='twitter:image'],amp-story",
      verbose: false,
    });
  }

  // layout alias
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");

  eleventyConfig.addNunjucksAsyncFilter(
    "addHash",
    function (absolutePath, callback) {
      readFile(`_site${absolutePath}`, {
        encoding: "utf-8",
      })
        .then((content) => {
          return hasha.async(content);
        })
        .then((hash) => {
          callback(null, `${absolutePath}?hash=${hash.substr(0, 10)}`);
        })
        .catch((error) => callback(error));
    }
  );

  async function lastModifiedDate(filename) {
    try {
      const { stdout } = await execFile("git", [
        "log",
        "-1",
        "--format=%cd",
        filename,
      ]);
      return new Date(stdout);
    } catch (e) {
      console.error(e.message);
      // Fallback to stat if git isn't working.
      const stats = await stat(filename);
      return stats.mtime; // Date
    }
  }
  // Cache the lastModifiedDate call because shelling out to git is expensive.
  // This means the lastModifiedDate will never change per single eleventy invocation.
  const lastModifiedDateCache = new Map();
  eleventyConfig.addNunjucksAsyncFilter(
    "lastModifiedDate",
    function (filename, callback) {
      const call = (result) => {
        result.then((date) => callback(null, date));
        result.catch((error) => callback(error));
      };
      const cached = lastModifiedDateCache.get(filename);
      if (cached) {
        return call(cached);
      }
      const promise = lastModifiedDate(filename);
      lastModifiedDateCache.set(filename, promise);
      call(promise);
    }
  );

  eleventyConfig.addFilter("encodeURIComponent", function (str) {
    return encodeURIComponent(str);
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd-LL-yyyy");
  });

  eleventyConfig.addFilter("sitemapDateTimeString", (dateObj) => {
    const dt = DateTime.fromJSDate(dateObj, { zone: "utc" });
    if (!dt.isValid) {
      return "";
    }
    return dt.toISO();
  });

  // for adding new key-value to a dictionary
  // first used in postslist.njk
  eleventyConfig.addFilter("setAttribute", function (dictionary, key, value) {
    dictionary[key] = value;
    return dictionary;
  });

  // used in /pages/search-index.json
  eleventyConfig.addFilter("search", (collection) => {
    var index = elasticlunr(function () {
      this.addField("title");
      this.addField("keywords");
      this.addField("tags");
      this.addField("cat");
      this.setRef("id");
    });
    collection.forEach((page) => {
      index.addDoc({
        id: page.url,
        title: page.title,
        keywords: page.keywords,
        tags: page.tags,
        cat: page.cat ? categories.find(item => item.name === page.cat).fontello : "icon-tags",
        target: page.target,
        //"content": page.templateContent,
      });
    });
    return index.toJSON();
  });

  // Get the first `n` elements of a collection
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  eleventyConfig.addCollection("tagList", require("./src/_11ty/getTagList"));
  // Filter source file names using a glob

  eleventyConfig.addPassthroughCopy({ "src/img": "img" });
  eleventyConfig.addPassthroughCopy({ "src/files": "files" }); // for personal files
  eleventyConfig.addPassthroughCopy("src/css");
  // We need to copy cached.js only if GA is used
  eleventyConfig.addPassthroughCopy(GA_ID ? "src/js" : "src/js/*[!cached].*");
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" }); // Copy `src/fonts` to `_site/fonts`
  // eleventyConfig.addPassthroughCopy("src/_headers");
  eleventyConfig.addPassthroughCopy({ "src/fontello": "fontello" });

  // We need to rebuild upon JS change to update the CSP.
  eleventyConfig.addWatchTarget("./src/js/");
  // We need to rebuild on CSS change to inline it.
  eleventyConfig.addWatchTarget("./src/css/");
  // Unfortunately this means .eleventyignore needs to be maintained redundantly.
  // But without this the JS build artefacts doesn't trigger a build.
  eleventyConfig.setUseGitIgnore(false);

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true, // html tag inside source
    breaks: true, // use '\n' as <br>
    linkify: true, // Autoconvert URL-like text to links
  })
    .use(require("markdown-it-anchor"), {
      permalink: true,
      permalinkClass: "direct-link",
      permalinkSymbol: "#",
    })
    .use(require("markdown-it-mark")) // ==mark==
    .use(require("markdown-it-attrs"), {
      // use {:} options
      leftDelimiter: "{:",
      rightDelimiter: "}",
    })
    .use(require("markdown-it-emoji")) // emoji
    // .use(require("markdown-it-table-of-contents")) // [[toc]] (no spaces)
    .use(tm, {
      engine: require("katex"),
      delimiters: "dollars",
      katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
    })
    .use(require("markdown-it-task-lists")) // tasks [x]
    .use(mdItContainer, "success")
    .use(mdItContainer, "info")
    .use(mdItContainer, "warning")
    .use(mdItContainer, "danger")
    .use(mdItContainer, "code-output-equal")
    .use(mdItContainer, "code-output-flex")
    .use(mdItContainer, "code-2cols")
    .use(mdItContainer, "col-2-equal")
    .use(mdItContainer, "col-2-flex")
    .use(mdItContainer, "list-item") // for items like in MacOS fresh start post
    .use(require("markdown-it-kbd")) // [[Ctrl]]
    .use(require("markdown-it-footnote"))
    .use(mdItContainer, "hsbox", {
      validate: function (params) {
        return params.trim().match(/^hsbox\s+(.*)$/);
      },
      render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^hsbox\s+(.*)$/);
        if (tokens[idx].nesting === 1) {
          // opening tag
          return (
            '<div class="hsbox"><div class="hs__title">' +
            markdownItp.renderInline(m[1]) +
            '</div><div class="hs__content">'
          );
        } else {
          // closing tag
          return "</div></div>";
        }
      },
    })
    .use(require("@gerhobbelt/markdown-it-inline-text-color"));
  eleventyConfig.setLibrary("md", markdownLibrary);

  // using {% markdown %}{% endmarkdown %} inside .njk
  eleventyConfig.addPairedShortcode("markdown", (content, inline = null) => {
    return inline
      ? markdownLibrary.renderInline(content)
      : markdownLibrary.render(content);
  });

  eleventyConfig.addPairedShortcode("hsbox", (content, title) => {
    return (
      '<div class="hsbox"><div class="hs__title">' +
      markdownLibrary.renderInline(title) +
      '</div><div class="hs__content">' +
      markdownLibrary.render(content) +
      "</div></div>"
    );
  });

  // using {% ref "url" %}
  eleventyConfig.addShortcode("ref", function (url) {
    return (
      '<sup><a href="' +
      url +
      '" rel="noopener noreferrer" target="_blank">[ref]</a></sup>'
    );
  });

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("_site/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid", "css"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.io/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: ".",
      includes: "src/_includes",
      data: "src/_data",
      // Warning hardcoded throughout repo. Find and replace is your friend :)
      output: "_site",
    },
  };
};
