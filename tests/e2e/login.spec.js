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
