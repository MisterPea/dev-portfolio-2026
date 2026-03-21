import { initButtonEmail } from "./renderEmail.ts";
import spotifyListening from "./spotifyListening.ts";

const COLOR_SCHEME_STORAGE_KEY = "color-scheme";
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

// type LambdaPayload =
//   | string
//   | {
//     message?: string;
//     content?: string;
//     text?: string;
//   };

// async function hydrateLambdaWidgets() {
//   const widgets = document.querySelectorAll<HTMLElement>("[data-lambda-widget]");

//   await Promise.all(
//     [...widgets].map(async (widget) => {
//       const endpoint = widget.dataset.endpoint;
//       const fallback = widget.dataset.fallback ?? "This live module is unavailable.";
//       const statusNode = widget.querySelector<HTMLElement>("[data-lambda-status]");

//       if (!endpoint || !statusNode) {
//         return;
//       }

//       try {
//         const response = await fetch(endpoint, {
//           headers: {
//             Accept: "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Request failed with status ${response.status}`);
//         }

//         const payload = await response.json() as LambdaPayload;

//         if (typeof payload === "string") {
//           statusNode.textContent = payload;
//           return;
//         }

//         statusNode.textContent = payload.message ?? payload.content ?? payload.text ?? fallback;
//       } catch (_error) {
//         statusNode.textContent = fallback;
//         widget.dataset.state = "error";
//       }
//     }),
//   );
// }

// void hydrateLambdaWidgets();
initializeColorSchemeToggle();
void spotifyListening();
