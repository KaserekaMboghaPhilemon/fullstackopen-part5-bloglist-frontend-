const { test, expect } = require("@playwright/test");

const baseURL = "http://127.0.0.1:5174";
const credentials = {
  username: "developer",
  password: "kase133246557",
};

test("Login succeeds with correct credentials", async ({ page }) => {
  // Navigate to the app and clear localStorage
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.localStorage.clear());
  await page.reload({ waitUntil: "domcontentloaded" });

  // Navigate to login
  await page.getByRole("link", { name: /login/i }).click();

  // Fill in login form
  await page.locator('input[name="Username"]').fill(credentials.username);
  await page.locator('input[name="Password"]').fill(credentials.password);
  await page.getByRole("button", { name: /login/i }).click();

  // Verify successful login - should redirect to home with blogs visible
  await expect(page).toHaveURL(baseURL + "/", { timeout: 15000 });
  await expect(page.getByRole("heading", { name: /blogs/i })).toBeVisible();
  // Navigation should show new blog link when logged in
  await expect(page.getByRole("link", { name: /new blog/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /logout/i })).toBeVisible();
});

test("Login fails with incorrect credentials", async ({ page }) => {
  // Navigate to the app and clear localStorage
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.localStorage.clear());
  await page.reload({ waitUntil: "domcontentloaded" });

  // Navigate to login
  await page.getByRole("link", { name: /login/i }).click();

  // Fill in login form with wrong password
  await page.locator('input[name="Username"]').fill(credentials.username);
  await page.locator('input[name="Password"]').fill("wrongpassword");
  await page.getByRole("button", { name: /login/i }).click();

  // Verify error message
  await expect(page.getByText(/wrong username or password/i)).toBeVisible({
    timeout: 15000,
  });

  // Should stay on login page
  await expect(page).toHaveURL(baseURL + "/login");
});

test("A logged-in user can create a blog", async ({ page }) => {
  // Navigate to the app and clear localStorage
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.localStorage.clear());
  await page.reload({ waitUntil: "domcontentloaded" });

  // First login
  await page.getByRole("link", { name: /login/i }).click();
  await page.locator('input[name="Username"]').fill(credentials.username);
  await page.locator('input[name="Password"]').fill(credentials.password);
  await page.getByRole("button", { name: /login/i }).click();
  await expect(page).toHaveURL(baseURL + "/");

  const timestamp = Date.now();
  const blogTitle = `E2E Test Blog ${timestamp}`;
  const blogAuthor = "Playwright Test Author";
  const blogUrl = "https://e2e-test.example.com";

  // Click on "new blog" link
  await page.getByRole("link", { name: /new blog/i }).click();

  // Verify we're on the create page
  await expect(page).toHaveURL(baseURL + "/create");
  await expect(page.getByText("Create a new blog")).toBeVisible();

  // Fill in the form using the actual field names rendered by the component
  await page.locator('input[name="Title"]').fill(blogTitle);
  await page.locator('input[name="Author"]').fill(blogAuthor);
  await page.locator('input[name="Url"]').fill(blogUrl);

  // Submit the form
  await page.getByRole("button", { name: /create/i }).click();

  // Should redirect to home after creation
  await expect(page).toHaveURL(baseURL + "/");

  // Verify the blog appears in the list
  await expect(
    page.getByRole("link", { name: new RegExp(blogTitle) }),
  ).toBeVisible({ timeout: 15000 });
});

test("A logged-in user can like blogs", async ({ page }) => {
  // Navigate to the app and clear localStorage
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.localStorage.clear());
  await page.reload({ waitUntil: "domcontentloaded" });

  // First login
  await page.getByRole("link", { name: /login/i }).click();
  await page.locator('input[name="Username"]').fill(credentials.username);
  await page.locator('input[name="Password"]').fill(credentials.password);
  await page.getByRole("button", { name: /login/i }).click();
  await expect(page).toHaveURL(baseURL + "/");

  const timestamp = Date.now();
  const blogTitle = `Like Test Blog ${timestamp}`;
  const blogAuthor = "Like Test Author";
  const blogUrl = "https://like-test.example.com";

  // Create a blog first
  await page.getByRole("link", { name: /new blog/i }).click();
  await page.locator('input[name="Title"]').fill(blogTitle);
  await page.locator('input[name="Author"]').fill(blogAuthor);
  await page.locator('input[name="Url"]').fill(blogUrl);
  await page.getByRole("button", { name: /create/i }).click();
  await expect(page).toHaveURL(baseURL + "/");

  // Click on the blog to view details
  const blogLink = page
    .locator("li")
    .filter({ hasText: blogTitle })
    .filter({ hasText: blogAuthor })
    .getByRole("link")
    .first();
  await expect(blogLink).toBeVisible({ timeout: 15000 });
  await blogLink.click();

  // Verify we're on the blog detail page
  await expect(
    page.getByRole("heading", { name: new RegExp(blogTitle) }),
  ).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/likes 0/)).toBeVisible({ timeout: 15000 });

  // Click the like button
  await page.getByRole("button", { name: /^like$/i }).click();

  // Verify the like count increased
  await expect(page.getByText(/likes 1/i)).toBeVisible({ timeout: 20000 });

  // Like again
  await page.getByRole("button", { name: /^like$/i }).click();
  await expect(page.getByText(/likes 2/i)).toBeVisible({ timeout: 20000 });
});

test("A logged-in user can delete a blog they created", async ({ page }) => {
  // Navigate to the app and clear localStorage
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.localStorage.clear());
  await page.reload({ waitUntil: "domcontentloaded" });

  // First login
  await page.getByRole("link", { name: /login/i }).click();
  await page.locator('input[name="Username"]').fill(credentials.username);
  await page.locator('input[name="Password"]').fill(credentials.password);
  await page.getByRole("button", { name: /login/i }).click();
  await expect(page).toHaveURL(baseURL + "/");

  const timestamp = Date.now();
  const blogTitle = `Delete Test Blog ${timestamp}`;
  const blogAuthor = "Delete Test Author";
  const blogUrl = "https://delete-test.example.com";

  // Create a blog first
  await page.getByRole("link", { name: /new blog/i }).click();
  await page.locator('input[name="Title"]').fill(blogTitle);
  await page.locator('input[name="Author"]').fill(blogAuthor);
  await page.locator('input[name="Url"]').fill(blogUrl);
  await page.getByRole("button", { name: /create/i }).click();
  await expect(page).toHaveURL(baseURL + "/");

  // Click on the blog to view details
  const blogLink = page
    .locator("li")
    .filter({ hasText: blogTitle })
    .filter({ hasText: blogAuthor })
    .getByRole("link")
    .first();
  await expect(blogLink).toBeVisible({ timeout: 20000 });
  await blogLink.click();

  // Verify we're on the blog detail page and remove button is visible
  await expect(
    page.getByRole("heading", { name: new RegExp(blogTitle) }),
  ).toBeVisible({ timeout: 15000 });
  await expect(page.getByRole("button", { name: /remove/i })).toBeVisible({
    timeout: 15000,
  });

  // Click the remove button
  page.on("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: /remove/i }).click();

  // Should redirect to home after deletion
  await expect(page).toHaveURL(baseURL + "/");

  // Verify the blog is no longer in the list
  await expect(page.getByText(blogTitle)).not.toBeVisible();
});
