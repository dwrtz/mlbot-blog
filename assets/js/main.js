const root = document.documentElement;
const storedTheme = localStorage.getItem("theme");

if (storedTheme) {
  root.dataset.theme = storedTheme;
}

document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
});
