class ThemeManager {
	constructor() {
		// Cache DOM elements once
		this.toggle = document.getElementById("theme-toggle");
		this.icon = document.getElementById("theme-icon");

		// Get data attributes once
		const { iconBase, iconDark, iconLight } = this.toggle.dataset;
		this.iconBase = iconBase;
		this.iconDark = iconDark;
		this.iconLight = iconLight;

		this.init();
	}

	init() {
		this.setInitialTheme();
		this.toggle.addEventListener("click", () => this.toggleTheme());
	}

	setInitialTheme() {
		const savedTheme = localStorage.getItem("theme");
		const systemDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;

		const initialTheme = savedTheme || (systemDark ? "dark" : "light");

		const syntaxLight = document.getElementById("syntax-light");
		const syntaxDark = document.getElementById("syntax-dark");

		syntaxLight.disabled = initialTheme === "dark";
		syntaxDark.disabled = initialTheme === "light";

		document.documentElement.setAttribute("data-theme", initialTheme);
		this.updateIcon(initialTheme === "dark");
	}

	toggleTheme() {
		const isDark =
			document.documentElement.getAttribute("data-theme") === "dark";
		const newTheme = isDark ? "light" : "dark";

		document.body.classList.add("theme-transition");
		document.documentElement.setAttribute("data-theme", newTheme);

		this.updateIcon(!isDark);

		localStorage.setItem("theme", newTheme);

		const syntaxLight = document.getElementById("syntax-light");
		const syntaxDark = document.getElementById("syntax-dark");

		syntaxLight.disabled = newTheme === "dark";
		syntaxDark.disabled = newTheme === "light";

		requestAnimationFrame(() => {
			setTimeout(() => {
				document.body.classList.remove("theme-transition");
			}, 300);
		});
	}

	updateIcon(isDark) {
		this.icon.setAttribute(
			"href",
			`${this.iconBase}${isDark ? this.iconDark : this.iconLight}`,
		);
	}
}

// Use modern syntax
document.addEventListener("DOMContentLoaded", () => new ThemeManager());
