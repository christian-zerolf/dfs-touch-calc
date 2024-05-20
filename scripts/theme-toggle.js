const $themeToggle = document.querySelector('.theme-toggle');
const linkDark = document.querySelector(
	'link[media="(prefers-color-scheme: dark)"]'
);

$themeToggle.addEventListener('click', changeTheme);

function changeTheme() {
	if (linkDark.disabled) {
		linkDark.disabled = false;
		$themeToggle.classList.toggle('active');
	} else {
		linkDark.disabled = true;
		$themeToggle.classList.toggle('active');
	}
}
