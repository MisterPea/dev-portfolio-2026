import { expect, test } from "@playwright/test";

const spotifyResponse = {
  track_name: "Test Track",
  artist: "Test Artist",
  album: "Test Album",
  url: "https://open.spotify.com/track/test-track",
  is_listening: true,
};

const projectRoutes = [
  "/sec-insider-cluster/",
  "/word-salad-sifter/",
  "/sqlite-worker/",
  "/schwab-node/",
];

test.beforeEach(async ({ page }) => {
  await page.route("https://p7ia9yj603.execute-api.us-east-1.amazonaws.com/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(spotifyResponse),
    });
  });
});

test("home page renders key content and spotify module", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Perry Angelora/i);
  await expect(page.getByRole("link", { name: /SEC Insider Trade Clusters/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Word Salad Sifter/i })).toBeVisible();
  await expect(page.locator(".spotify-data")).toContainText("Test Track");
  await expect(page.locator(".spotify-data")).toContainText("Test Artist");
});

for (const route of projectRoutes) {
  test(`project page ${route} loads`, async ({ page }) => {
    await page.goto(route);

    await expect(page.locator("main")).toBeVisible();
    await expect(page.getByRole("link", { name: /Perry Angelora/i })).toBeVisible();
    await expect(page.locator("main")).not.toBeEmpty();
  });
}

test("theme toggle persists selection", async ({ page }) => {
  await page.goto("/");

  const toggle = page.locator("[data-color-scheme-toggle]");

  await toggle.click();

  await expect(page.locator("html")).toHaveAttribute("data-color-scheme", "dark");
  await expect(toggle).toHaveAttribute("aria-label", /switch to light mode/i);

  await page.reload();

  await expect(page.locator("html")).toHaveAttribute("data-color-scheme", "dark");
});

test("email button triggers a mailto link", async ({ page }) => {
  await page.addInitScript(() => {
    const originalClick = HTMLAnchorElement.prototype.click;

    HTMLAnchorElement.prototype.click = function patchedClick(this: HTMLAnchorElement) {
      if (this.href.startsWith("mailto:")) {
        document.documentElement.dataset.lastMailtoHref = this.href;
        return;
      }

      return originalClick.call(this);
    };
  });

  await page.goto("/");

  const emailButton = page.getByRole("button", { name: /email/i });

  await emailButton.click();

  const mailtoHref = await page.evaluate(() => {
    return document.documentElement.dataset.lastMailtoHref ?? null;
  });

  expect(mailtoHref).toMatch(/^mailto:/);
});
