const $themeToggle = document.querySelector('.theme-toggle');
const linkDark = document.querySelector(
	'link[media="(prefers-color-scheme: dark)"]'
);
const linkLight = document.querySelector(
	'link[media="(prefers-color-scheme: light)"]'
);

const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

document.addEventListener('DOMContentLoaded', () => {
	if (isDarkMode) {
		linkLight.disabled = true;
		linkDark.disabled = false;
	} else {
		linkDark.disabled = true;
		linkLight.disabled = false;
		$themeToggle.classList.toggle('active');
	}
});

$themeToggle.addEventListener('click', changeTheme);

function changeTheme() {
	if (linkDark.disabled) {
		linkDark.disabled = false;
		linkLight.disabled = true;
		$themeToggle.classList.toggle('active');
	} else {
		linkDark.disabled = true;
		linkLight.disabled = false;
		$themeToggle.classList.toggle('active');
	}
}
