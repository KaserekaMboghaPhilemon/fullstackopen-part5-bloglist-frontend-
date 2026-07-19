const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on("console", (msg) => console.log("console:", msg.text()));
  page.on("requestfailed", (req) =>
    console.log("requestfailed:", req.url(), req.failure()?.errorText),
  );
  page.on("response", async (res) => {
    if (res.url().includes("/api/blogs")) {
      console.log("response", res.status(), res.url());
      try {
        console.log(await res.text());
      } catch (e) {
        console.log("response body read failed", e.message);
      }
    }
  });

  await page.goto("http://127.0.0.1:5173", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.localStorage.clear());
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.getByRole("link", { name: /login/i }).click();
  await page.locator('input[name="Username"]').fill("developer");
  await page.locator('input[name="Password"]').fill("kase133246557");
  await page.getByRole("button", { name: /login/i }).click();
  await page.waitForTimeout(1500);
  console.log("after login url", page.url());
  console.log("after login body", await page.locator("body").textContent());

  const title = "Inspect " + Date.now();
  await page.getByRole("link", { name: /new blog/i }).click();
  await page.locator('input[name="Title"]').fill(title);
  await page.locator('input[name="Author"]').fill("Author");
  await page.locator('input[name="Url"]').fill("https://example.com");
  await page.getByRole("button", { name: /create/i }).click();
  await page.waitForTimeout(3000);
  console.log("after create url", page.url());
  console.log("after create body", await page.locator("body").textContent());
  await page
    .locator("li")
    .filter({ hasText: title })
    .filter({ hasText: "Author" })
    .getByRole("link")
    .first()
    .click();
  await page.waitForTimeout(3000);
  console.log("after detail url", page.url());
  const detailText = await page.locator("body").innerText();
  console.log("detail text", detailText);
  console.log("like count matches", detailText.match(/likes\s*\d+/g));

  await page.getByRole("button", { name: /^like$/i }).click();
  await page.waitForTimeout(3000);
  const detailTextAfterLike = await page.locator("body").innerText();
  console.log("detail text after like", detailTextAfterLike);
  console.log(
    "like count matches after",
    detailTextAfterLike.match(/likes\s*\d+/g),
  );
  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
