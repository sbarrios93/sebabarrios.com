window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
      document.getElementById("navbar").classList.add("dark:md:border-gray-700/75")
      document.getElementById("navbar").classList.add("md:border-gray-200")
      document.getElementById("navbar").classList.remove("md:border-gray-200/0")
      document.getElementById("navbar").classList.remove("dark:md:border-gray-700/0")
    } else {
      document.getElementById("navbar").classList.add("dark:md:border-gray-700/0")
      document.getElementById("navbar").classList.add("md:border-gray-200/0")
      document.getElementById("navbar").classList.remove("md:border-gray-200")
      document.getElementById("navbar").classList.remove("dark:md:border-gray-700/75")

  }
}