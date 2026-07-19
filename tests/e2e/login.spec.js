const { test, expect, beforeEach, describe } = require("@playwright/test");

const baseURL = "http://127.0.0.1:5174";
const credentials = {
  username: "developer",
  password: "kase133246557",
};

async function login(page) {
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.localStorage.clear());
  await page.reload({ waitUntil: "domcontentloaded" });

  await page.getByRole("link", { name: /login/i }).click();
  await page.locator('input[name="Username"]').fill(credentials.username);
  await page.locator('input[name="Password"]').fill(credentials.password);
  await page.getByRole("button", { name: /login/i }).click();

  await page.waitForURL(/\/(?:$|\?)/, { timeout: 20000 });
  await expect(page).toHaveURL(baseURL + "/", { timeout: 20000 });
  await expect(page.getByRole("link", { name: /new blog/i })).toBeVisible({
    timeout: 20000,
  });
}

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto(baseURL, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => window.localStorage.clear());
    await page.reload({ waitUntil: "domcontentloaded" });
  });

  test("Login form is shown", async ({ page }) => {
    await page.getByRole("link", { name: /login/i }).click();
    await expect(page.getByText("Log in to application")).toBeVisible();
    await expect(page.locator('input[name="Username"]')).toBeVisible();
    await expect(page.locator('input[name="Password"]')).toBeVisible();
    await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
  });

  test("Login succeeds with correct credentials", async ({ page }) => {
    await page.getByRole("link", { name: /login/i }).click();
    await page.locator('input[name="Username"]').fill(credentials.username);
    await page.locator('input[name="Password"]').fill(credentials.password);
    await page.getByRole("button", { name: /login/i }).click();

    await page.waitForURL(/\/(?:$|\?)/, { timeout: 20000 });
    await expect(page).toHaveURL(baseURL + "/", { timeout: 20000 });
    await expect(page.getByRole("link", { name: /new blog/i })).toBeVisible({
      timeout: 20000,
    });
    await expect(page.getByRole("button", { name: /logout/i })).toBeVisible({
      timeout: 20000,
    });
  });

  test("Login fails with wrong credentials", async ({ page }) => {
    await page.getByRole("link", { name: /login/i }).click();
    await page.locator('input[name="Username"]').fill(credentials.username);
    await page.locator('input[name="Password"]').fill("wrong");
    await page.getByRole("button", { name: /login/i }).click();

    await expect(page.getByText(/wrong username or password/i)).toBeVisible({
      timeout: 15000,
    });
    await expect(page).toHaveURL(baseURL + "/login", { timeout: 15000 });
  });
});

describe("When logged in", () => {
  test("a new blog can be created", async ({ page }) => {
    await login(page);

    const timestamp = Date.now();
    const title = `E2E Create ${timestamp}`;
    const author = "Playwright User";

    await page.getByRole("link", { name: /new blog/i }).click();
    await page.locator('input[name="Title"]').fill(title);
    await page.locator('input[name="Author"]').fill(author);
    await page.locator('input[name="Url"]').fill("https://example.com");
    await page.getByRole("button", { name: /^create$/i }).click();

    await expect(page).toHaveURL(baseURL + "/");
    await expect(
      page.getByRole("link", { name: new RegExp(title) }),
    ).toBeVisible({ timeout: 15000 });
  });

  test("a blog can be liked", async ({ page }) => {
    await login(page);

    const timestamp = Date.now();
    const title = `E2E Like ${timestamp}`;
    const author = "Playwright User";

    await page.getByRole("link", { name: /new blog/i }).click();
    await page.locator('input[name="Title"]').fill(title);
    await page.locator('input[name="Author"]').fill(author);
    await page.locator('input[name="Url"]').fill("https://example.com");
    await page.getByRole("button", { name: /^create$/i }).click();

    await page
      .locator("li")
      .filter({ hasText: title })
      .filter({ hasText: author })
      .getByRole("link")
      .first()
      .click();

    await expect(
      page.getByRole("heading", { name: new RegExp(title) }),
    ).toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByText(/likes 0/)).toBeVisible({ timeout: 15000 });

    await page.getByRole("button", { name: /^like$/i }).click();
    await expect(page.getByText(/likes 1/)).toBeVisible({ timeout: 15000 });
  });

  test("a blog can be deleted by its creator", async ({ page }) => {
    await login(page);

    const timestamp = Date.now();
    const title = `E2E Delete ${timestamp}`;
    const author = "Playwright User";

    await page.getByRole("link", { name: /new blog/i }).click();
    await page.locator('input[name="Title"]').fill(title);
    await page.locator('input[name="Author"]').fill(author);
    await page.locator('input[name="Url"]').fill("https://example.com");
    await page.getByRole("button", { name: /^create$/i }).click();

    await page
      .locator("li")
      .filter({ hasText: title })
      .filter({ hasText: author })
      .getByRole("link")
      .first()
      .click();

    await expect(page.getByRole("button", { name: /remove/i })).toBeVisible({
      timeout: 15000,
    });

    page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
    await page.getByRole("button", { name: /remove/i }).click();

    await expect(page).toHaveURL(baseURL + "/");
    await expect(page.getByText(title)).not.toBeVisible();
  });
});
