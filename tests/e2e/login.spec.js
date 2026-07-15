const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:5173", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => window.localStorage.clear());
    await page.reload({ waitUntil: "domcontentloaded" });
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in to application")).toBeVisible();
    await expect(page.locator('input[name="Username"]')).toBeVisible();
    await expect(page.locator('input[name="Password"]')).toBeVisible();
    await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.locator('input[name="Username"]').fill("developer");
      await page.locator('input[name="Password"]').fill("kase133246557");
      await page.getByRole("button", { name: /login/i }).click();

      await expect(
        page.getByRole("paragraph").filter({ hasText: /logged in/i }),
      ).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.locator('input[name="Username"]').fill("developer");
      await page.locator('input[name="Password"]').fill("wrong");
      await page.getByRole("button", { name: /login/i }).click();

      await expect(page.getByText("wrong username or password")).toBeVisible();
    });
  });
});

// 5.19: Test block for blog creation actions
describe("When logged in", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:5173", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => window.localStorage.clear());
    await page.reload({ waitUntil: "domcontentloaded" });

    await page.locator('input[name="Username"]').fill("developer");
    await page.locator('input[name="Password"]').fill("kase133246557");
    await page.getByRole("button", { name: /login/i }).click();

    await expect(
      page.getByRole("paragraph").filter({ hasText: /logged in/i }),
    ).toBeVisible();
  });

  test("a new blog can be created", async ({ page }) => {
    const openFormButton = page.getByRole("button", {
      name: /create new blog/i,
    });
    if (await openFormButton.isVisible()) {
      await openFormButton.click();
    }

    await page
      .locator('input[name="Title"]')
      .fill("E2E Testing with Playwright");
    await page.locator('input[name="Author"]').fill("Kasereka Philemon");
    await page.locator('input[name="Url"]').fill("https://playwright.dev");

    await page.getByRole("button", { name: /^create$/i }).click();

    await expect(
      page
        .getByText(/E2E Testing with Playwright/i)
        .filter({ hasText: /Kasereka Philemon/i }),
    ).toBeVisible();
  });
});
