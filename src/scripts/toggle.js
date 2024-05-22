const $toggle = document.querySelector('#toggle');
const $body = document.querySelector('body');

const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

document.addEventListener('DOMContentLoaded', () => {
	if (isDarkMode) {
		$body.classList.add('dark');
	} else {
		$body.classList.remove('dark');
		$toggle.classList.toggle('active');
	}
});

$toggle.addEventListener('click', changeTheme);

function changeTheme() {
	if ($body.classList.contains('dark')) {
		$body.classList.remove('dark');
		$toggle.classList.toggle('active');
	} else {
		$body.classList.add('dark');
		$toggle.classList.toggle('active');
	}
}
