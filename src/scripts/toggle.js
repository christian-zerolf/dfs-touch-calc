const $toggle = document.querySelector("#toggle");
const $body = document.querySelector("body");

document.addEventListener("DOMContentLoaded", () => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (isDarkMode) {
    $body.classList.add("dark");
  } else {
    $toggle.classList.add("active");
  }

  $toggle.addEventListener("click", changeTheme);
});

function changeTheme() {
  $body.classList.toggle("dark");
  $toggle.classList.toggle("active");
}
