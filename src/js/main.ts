import { initButtonEmail } from "./renderEmail.ts";
import spotifyListening from "./spotifyListening.ts";

const COLOR_SCHEME_STORAGE_KEY = "color-scheme";
const STICKY_TAGLINE_HIDDEN_CLASS = "is-sticky-hidden";
const STICKY_TAGLINE_BUFFER_MS = 125;
const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

initButtonEmail();

function getStoredColorScheme() {
  try {
    const value = window.localStorage.getItem(COLOR_SCHEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch (_error) {
    return null;
  }
}

function getActiveColorScheme() {
  const storedColorScheme = getStoredColorScheme();

  if (storedColorScheme) {
    return storedColorScheme;
  }

  return colorSchemeQuery.matches ? "dark" : "light";
}

function applyColorScheme(colorScheme: "light" | "dark" | null) {
  if (colorScheme) {
    document.documentElement.dataset.colorScheme = colorScheme;
    return;
  }

  document.documentElement.removeAttribute("data-color-scheme");
}

function updateColorSchemeToggle() {

  const toggle = document.querySelector<HTMLButtonElement>("[data-color-scheme-toggle]");

  if (!toggle) {
    return;
  }

  const activeColorScheme = getActiveColorScheme();
  const nextColorScheme = activeColorScheme === "dark" ? "light" : "dark";

  toggle.classList.toggle("theme-toggle--toggled", activeColorScheme === "dark");
  toggle.setAttribute("aria-pressed", String(activeColorScheme === "dark"));
  toggle.setAttribute("aria-label", `Switch to ${nextColorScheme} mode`);
  toggle.setAttribute("title", `Switch to ${nextColorScheme} mode`);
}

function initializeColorSchemeToggle() {
  const toggle = document.querySelector<HTMLButtonElement>("[data-color-scheme-toggle]");

  if (!toggle) {
    return;
  }

  applyColorScheme(getStoredColorScheme());
  updateColorSchemeToggle();

  toggle.addEventListener("click", () => {
    const nextColorScheme = getActiveColorScheme() === "dark" ? "light" : "dark";

    try {
      window.localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, nextColorScheme);
    } catch (_error) {
      // Ignore storage access issues and still apply the theme for this page load.
    }

    applyColorScheme(nextColorScheme);
    updateColorSchemeToggle();
  });

  colorSchemeQuery.addEventListener("change", () => {
    if (getStoredColorScheme()) {
      return;
    }

    applyColorScheme(null);
    updateColorSchemeToggle();
  });
}

// Classlist manipulation for fade in/out of site tag
function initializeStickyTagline() {
  const tagline = document.querySelector<HTMLElement>(".site-tagline");
  const siteTitle = document.querySelector<HTMLElement>(".site-title");
  const siteMain = document.querySelector<HTMLElement>(".site-main");
  const themeToggle = document.querySelector<HTMLElement>(".color-scheme-toggle");

  if (!tagline || !siteMain || !siteTitle || !themeToggle) {
    return;
  }
  let hideTimeoutId: number | null = null;

  const clearHideTimeout = () => {
    if (hideTimeoutId === null) {
      return;
    }

    window.clearTimeout(hideTimeoutId);
    hideTimeoutId = null;
  };

  let frameId: number | null = null;

  const updateStickyTagline = () => {
    frameId = null;

    const shouldHide = siteMain.getBoundingClientRect().top <= 80;

    if (!shouldHide) {
      clearHideTimeout();
      tagline.classList.remove(STICKY_TAGLINE_HIDDEN_CLASS);
      siteTitle.classList.remove(STICKY_TAGLINE_HIDDEN_CLASS);
      themeToggle.classList.remove(STICKY_TAGLINE_HIDDEN_CLASS);
      return;
    }

    if (
      hideTimeoutId !== null ||
      tagline.classList.contains(STICKY_TAGLINE_HIDDEN_CLASS) ||
      siteTitle.classList.contains(STICKY_TAGLINE_HIDDEN_CLASS) ||
      themeToggle.classList.contains(STICKY_TAGLINE_HIDDEN_CLASS)
    ) {
      return;
    }

    hideTimeoutId = window.setTimeout(() => {
      tagline.classList.add(STICKY_TAGLINE_HIDDEN_CLASS);
      siteTitle.classList.add(STICKY_TAGLINE_HIDDEN_CLASS);
      themeToggle.classList.add(STICKY_TAGLINE_HIDDEN_CLASS);
      hideTimeoutId = null;
    }, STICKY_TAGLINE_BUFFER_MS);
  };

  const queueStickyTaglineUpdate = () => {
    if (frameId !== null) {
      return;
    }

    frameId = window.requestAnimationFrame(updateStickyTagline);
  };

  window.addEventListener("scroll", queueStickyTaglineUpdate, { passive: true });
  window.addEventListener("resize", queueStickyTaglineUpdate);
  queueStickyTaglineUpdate();
}

initializeColorSchemeToggle();
initializeStickyTagline();
void spotifyListening();
