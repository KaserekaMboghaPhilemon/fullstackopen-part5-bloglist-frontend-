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
        .locator(".blog-summary")
        .filter({ hasText: /E2E Testing with Playwright/i })
        .filter({ hasText: /Kasereka Philemon/i })
        .first(),
    ).toBeVisible();
  });

  test("a blog can be liked", async ({ page }) => {
    const title = `Like test ${Date.now()}`;
    const author = "Playwright User";

    const openFormButton = page.getByRole("button", {
      name: /create new blog/i,
    });
    if (await openFormButton.isVisible()) {
      await openFormButton.click();
    }

    await page.locator('input[name="Title"]').fill(title);
    await page.locator('input[name="Author"]').fill(author);
    await page.locator('input[name="Url"]').fill("https://example.com");

    await page.getByRole("button", { name: /^create$/i }).click();

    const blogCard = page
      .locator(".blog-summary")
      .filter({ hasText: title })
      .filter({ hasText: author })
      .first();

    await expect(blogCard).toBeVisible();
    await blogCard.getByRole("button", { name: /view/i }).click();

    const details = page
      .locator("div")
      .filter({ hasText: /likes/i })
      .filter({ hasText: title })
      .first();

    await expect(details).toContainText("likes 0");

    await page
      .getByRole("button", { name: /^like$/i })
      .first()
      .click();
    await expect(details).toContainText("likes 1");
  });

  test("blogs are sorted by likes descending", async ({ page }) => {
    const mostLikedTitle = `Most liked ${Date.now()}`;
    const lessLikedTitle = `Less liked ${Date.now()}`;

    const openFormButton = page.getByRole("button", {
      name: /create new blog/i,
    });

    if (await openFormButton.isVisible()) {
      await openFormButton.click();
    }

    await page.locator('input[name="Title"]').fill(mostLikedTitle);
    await page.locator('input[name="Author"]').fill("Playwright User");
    await page.locator('input[name="Url"]').fill("https://example.com/most");
    await page.getByRole("button", { name: /^create$/i }).click();

    if (await openFormButton.isVisible()) {
      await openFormButton.click();
    }

    await page.locator('input[name="Title"]').fill(lessLikedTitle);
    await page.locator('input[name="Author"]').fill("Playwright User");
    await page.locator('input[name="Url"]').fill("https://example.com/less");
    await page.getByRole("button", { name: /^create$/i }).click();

    const mostLikedCard = page
      .locator(".blog-summary")
      .filter({ hasText: mostLikedTitle })
      .first();
    const lessLikedCard = page
      .locator(".blog-summary")
      .filter({ hasText: lessLikedTitle })
      .first();

    await expect(mostLikedCard).toBeVisible();
    await expect(lessLikedCard).toBeVisible();

    await mostLikedCard.getByRole("button", { name: /view/i }).click();
    await page
      .getByRole("button", { name: /^like$/i })
      .first()
      .click();
    await page
      .getByRole("button", { name: /^like$/i })
      .first()
      .click();

    await lessLikedCard.getByRole("button", { name: /view/i }).click();
    await page
      .getByRole("button", { name: /^like$/i })
      .nth(1)
      .click();

    const order = await page.evaluate(
      ({ mostLikedTitle, lessLikedTitle }) => {
        const cards = Array.from(document.querySelectorAll(".blog-summary"));
        const firstIndex = cards.findIndex((card) =>
          card.textContent.includes(mostLikedTitle),
        );
        const secondIndex = cards.findIndex((card) =>
          card.textContent.includes(lessLikedTitle),
        );

        return { firstIndex, secondIndex };
      },
      { mostLikedTitle, lessLikedTitle },
    );

    expect(order.firstIndex).toBeLessThan(order.secondIndex);
  });

  test("a blog can be deleted by its creator", async ({ page }) => {
    const title = `Delete test ${Date.now()}`;
    const author = "Playwright User";

    const openFormButton = page.getByRole("button", {
      name: /create new blog/i,
    });
    if (await openFormButton.isVisible()) {
      await openFormButton.click();
    }

    await page.locator('input[name="Title"]').fill(title);
    await page.locator('input[name="Author"]').fill(author);
    await page.locator('input[name="Url"]').fill("https://example.com");

    await page.getByRole("button", { name: /^create$/i }).click();

    const blogCard = page
      .locator(".blog-summary")
      .filter({ hasText: title })
      .filter({ hasText: author })
      .first();

    await expect(blogCard).toBeVisible();
    await blogCard.getByRole("button", { name: /view/i }).click();

    const removeButton = page.getByRole("button", { name: /^remove$/i });
    await expect(removeButton).toBeVisible();

    page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await removeButton.click();

    await expect(blogCard).not.toBeVisible();
  });

  test("only the creator can see the delete button", async ({ page }) => {
    const title = `Delete visibility ${Date.now()}`;
    const author = "Playwright User";

    const openFormButton = page.getByRole("button", {
      name: /create new blog/i,
    });
    if (await openFormButton.isVisible()) {
      await openFormButton.click();
    }

    await page.locator('input[name="Title"]').fill(title);
    await page.locator('input[name="Author"]').fill(author);
    await page.locator('input[name="Url"]').fill("https://example.com");

    await page.getByRole("button", { name: /^create$/i }).click();

    const blogCard = page
      .locator(".blog-summary")
      .filter({ hasText: title })
      .filter({ hasText: author })
      .first();

    await expect(blogCard).toBeVisible();
    await blogCard.getByRole("button", { name: /view/i }).click();

    await expect(page.getByRole("button", { name: /^remove$/i })).toBeVisible();
  });
});
