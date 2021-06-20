---
layout: post
title: "Dark / Light mode for static sites"
tags: [Web Dev, JavaScript, Static Site Generators, 11ty, GatsbyJS, Jekyll]
toc: true
icon: /img/header/night.svg
keywords: "toggle dark mode light mode moon sun flash problem static site gatsby 11ty eleventy cloak trick"
---

{% assign img-url = '/img/post/web-dev' %}

This note is for a general SSG. I use this method on this site (11ty).

## Toggle icon

``` html
<span id="toggle-dark-light" href="">
	<img src="/img/nav/moon.svg" alt="light-mode" height="20" width="20">
</span>
```

## Preventing flash loading

"Cloak trick" to prevent flash load for multiple sites (because the javascripts always come behind the html/css).

💡 **Idea**: wait for DOM loaded + apply dark them bedhind the scene and then show the site without flashing between light/dark mode.

This script placed right after <body>.

``` html
<script>
  function showTheme() {
    // Choose the toggle icon
    const btn = document.getElementById("toggle-dark-light");
    let toggleIcon = btn.firstElementChild;
    // check the saved theme on local
    const currentTheme = localStorage.getItem("theme");
    // switch to that saved theme (also change toggle icon)
    if (currentTheme === "dark") {
      document.body.classList.toggle("dark-theme");
      toggleIcon.src = "/img/nav/sun.svg";
    } else if (currentTheme === "light") {
      document.body.classList.toggle("light-theme");
      toggleIcon.src = "/img/nav/moon.svg";
    }
  }

  // show content after DOM loaded
  function showContent() {
    document.body.style.visibility = 'visible';
    document.body.style.opacity = 1;
  }

  // listen to the DOM content loaded or not?
  window.addEventListener('DOMContentLoaded', (event) => {
    showTheme();
    showContent();
  });
</script>
```

## Toggling when clicking on icon

Script placed before `</body>`

``` html
<script>
  // Choose the toggle icon
  const btn = document.getElementById("toggle-dark-light");
  let toggleIcon = btn.firstElementChild;

  // Check for dark mode preference at the OS level
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  // Listen to click event on toggle icon
  btn.addEventListener("click", function () {
    // If the user's OS setting is dark and matches our .dark-theme class...
    if (prefersDarkScheme.matches) {
      document.body.classList.toggle("light-theme");
      var theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";
      toggleIconFn(theme);
    } else {
      // Otherwise
      document.body.classList.toggle("dark-theme");
      var theme = document.body.classList.contains("dark-theme")
        ? "dark"
        : "light";
      toggleIconFn(theme);
    }
    // Save the current preferred setting
    localStorage.setItem("theme", theme);
  });

  // Change icon
  const toggleIconFn = (theme) => {
    if (theme === "dark") {
      toggleIcon.src = "/img/nav/sun.svg";
    } else {
      toggleIcon.src = "/img/nav/moon.svg";
    }
  };
</script>
```

## For CSS{:#for-css}

If you use SCSS and wanna use custom CSS variables (`var(---var-name)`) and SCSS variable (`$var-name`), please read [next section](#custom-var).

``` scss
body {
  --text-color: #222;
  --bkg-color: #fff;
}
body.dark-theme {
  --text-color: #eee;
  --bkg-color: #121212;
}

// Styles for users who prefer light mode at the OS level
@media (prefers-color-scheme: dark) {
  // defaults to light theme
  body {
    --text-color: #eee;
    --bkg-color: #121212;
  }
  // Override dark mode with light mode styles if the user decides to swap
  body.light-theme {
    --text-color: #222;
    --bkg-color: #fff;
  }
}
```

## Using custom CSS variable & SCSS variable{:#custom-var}

In section "[For CSS](#for-css)", we have to write again and again the color for both dark and light mode. We can use custom variables in this case!

``` scss
// ./main.scss
// containing the definitions of colors

$text-color: #222;
$text-color-dark: #eee;

$bkg-color: #fff;
$bkg-color-dark: #121212;

@import "./mixin";
@import "./dark-light";
```

``` scss
// ./_mixin.scss
// containing the setting up for dark/light

@mixin light-vars() {
  --text-color: #{$text-color};
  --bkg-color: #{$bkg-color};
}

@mixin dark-vars() {
  --text-color: #{$text-color-dark};
  --bkg-color: #{$bkg-color-dark};
}
```

``` scss
// ./_dark-light.scss
// where to apply the colors

body {
	@include light-vars();
}

body.dark-theme {
	@include dark-vars();
}

// Styles for users who prefer light mode at the OS level
@media (prefers-color-scheme: dark) {
  /* defaults to light theme */
  body {
    @include light-vars();
  }
  /* Override dark mode with light mode styles if the user decides to swap */
  body.light-theme {
    @include dark-vars();
  }
}
```

## References

- **CSS-Tricks** -- [A Complete Guide to Dark Mode on the Web](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/#toggling-themes).
- **zwbetz** -- [Fix the White Flash on Page Load When Using a Dark Theme on a Static Site](https://zwbetz.com/fix-the-white-flash-on-page-load-when-using-a-dark-theme-on-a-static-site/).

