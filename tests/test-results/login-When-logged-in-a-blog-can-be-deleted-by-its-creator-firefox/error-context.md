# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.js >> When logged in >> a blog can be deleted by its creator
- Location: e2e\login.spec.js:122:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[name="Username"]')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]: Blog App
    - generic [ref=e6]:
      - link "blogs" [ref=e7] [cursor=pointer]:
        - /url: /
      - link "login" [active] [ref=e8] [cursor=pointer]:
        - /url: /login
  - generic [ref=e9]:
    - heading "Blogs" [level=2] [ref=e10]
    - list [ref=e11]:
      - listitem [ref=e12]:
        - link "E2E Test Blog 1784429365742 Playwright Test Author" [ref=e13] [cursor=pointer]:
          - /url: /blogs/6a5c3b36ca2d21df1280f443
      - listitem [ref=e14]:
        - link "Like Test Blog 1784429371771 Like Test Author" [ref=e15] [cursor=pointer]:
          - /url: /blogs/6a5c3b3cca2d21df1280f44e
      - listitem [ref=e16]:
        - link "E2E Create 1784429388565 Playwright User" [ref=e17] [cursor=pointer]:
          - /url: /blogs/6a5c3b4dca2d21df1280f47d
      - listitem [ref=e18]:
        - link "E2E Like 1784429392348 Playwright User" [ref=e19] [cursor=pointer]:
          - /url: /blogs/6a5c3b50ca2d21df1280f488
      - listitem [ref=e20]:
        - link "Software Cleave Masereka" [ref=e21] [cursor=pointer]:
          - /url: /blogs/6a5c3eccca2d21df1280f49d
      - listitem [ref=e22]:
        - link "Developer Philemon Kasereka" [ref=e23] [cursor=pointer]:
          - /url: /blogs/6a5c3ef0ca2d21df1280f4a1
      - listitem [ref=e24]:
        - link "Full-stack open Samuel Mbambu" [ref=e25] [cursor=pointer]:
          - /url: /blogs/6a5c3f90ca2d21df1280f4a5
      - listitem [ref=e26]:
        - link "E2E Test Blog 1784432013837 Playwright Test Author" [ref=e27] [cursor=pointer]:
          - /url: /blogs/6a5c458eca2d21df1280f4f1
      - listitem [ref=e28]:
        - link "Like Test Blog 1784432018136 Like Test Author" [ref=e29] [cursor=pointer]:
          - /url: /blogs/6a5c4592ca2d21df1280f4fc
      - listitem [ref=e30]:
        - link "E2E Create 1784432034764 Playwright User" [ref=e31] [cursor=pointer]:
          - /url: /blogs/6a5c45a3ca2d21df1280f52f
      - listitem [ref=e32]:
        - link "E2E Like 1784432038329 Playwright User" [ref=e33] [cursor=pointer]:
          - /url: /blogs/6a5c45a6ca2d21df1280f53a
      - listitem [ref=e34]:
        - link "E2E Test Blog 1784534230852 Playwright Test Author" [ref=e35] [cursor=pointer]:
          - /url: /blogs/6a5dd4d76b3e5937d78d7910
      - listitem [ref=e36]:
        - link "Like Test Blog 1784534236149 Like Test Author" [ref=e37] [cursor=pointer]:
          - /url: /blogs/6a5dd4dc6b3e5937d78d791b
      - listitem [ref=e38]:
        - link "E2E Create 1784534274719 Playwright User" [ref=e39] [cursor=pointer]:
          - /url: /blogs/6a5dd5036b3e5937d78d7948
      - listitem [ref=e40]:
        - link "E2E Like 1784534278824 Playwright User" [ref=e41] [cursor=pointer]:
          - /url: /blogs/6a5dd5086b3e5937d78d7953
      - listitem [ref=e42]:
        - link "E2E Test Blog 1784534416911 Playwright Test Author" [ref=e43] [cursor=pointer]:
          - /url: /blogs/6a5dd5926b3e5937d78d7974
      - listitem [ref=e44]:
        - link "Like Test Blog 1784534435606 Like Test Author" [ref=e45] [cursor=pointer]:
          - /url: /blogs/6a5dd5a56b3e5937d78d798f
      - listitem [ref=e46]:
        - link "E2E Test Blog 1784534444082 Playwright Test Author" [ref=e47] [cursor=pointer]:
          - /url: /blogs/6a5dd5ac6b3e5937d78d799a
      - listitem [ref=e48]:
        - link "Like Test Blog 1784534449491 Like Test Author" [ref=e49] [cursor=pointer]:
          - /url: /blogs/6a5dd5b26b3e5937d78d79a5
      - listitem [ref=e50]:
        - link "E2E Create 1784534511282 Playwright User" [ref=e51] [cursor=pointer]:
          - /url: /blogs/6a5dd5f06b3e5937d78d79d7
      - listitem [ref=e52]:
        - link "E2E Like 1784534519506 Playwright User" [ref=e53] [cursor=pointer]:
          - /url: /blogs/6a5dd5fa6b3e5937d78d79e2
      - listitem [ref=e54]:
        - link "E2E Create 1784534618061 Playwright User" [ref=e55] [cursor=pointer]:
          - /url: /blogs/6a5dd65b6b3e5937d78d7a1a
      - listitem [ref=e56]:
        - link "E2E Like 1784534636405 Playwright User" [ref=e57] [cursor=pointer]:
          - /url: /blogs/6a5dd66e6b3e5937d78d7a27
      - listitem [ref=e58]:
        - link "E2E Test Blog 1784534719543 Playwright Test Author" [ref=e59] [cursor=pointer]:
          - /url: /blogs/6a5dd6c06b3e5937d78d7a53
      - listitem [ref=e60]:
        - link "Like Test Blog 1784534727748 Like Test Author" [ref=e61] [cursor=pointer]:
          - /url: /blogs/6a5dd6c96b3e5937d78d7a5e
      - listitem [ref=e62]:
        - link "E2E Create 1784534767148 Playwright User" [ref=e63] [cursor=pointer]:
          - /url: /blogs/6a5dd6f06b3e5937d78d7a8f
      - listitem [ref=e64]:
        - link "E2E Like 1784534773728 Playwright User" [ref=e65] [cursor=pointer]:
          - /url: /blogs/6a5dd6f66b3e5937d78d7a9a
      - listitem [ref=e66]:
        - link "E2E Create 1784535219466 Playwright User" [ref=e67] [cursor=pointer]:
          - /url: /blogs/6a5dd8b56b3e5937d78d7ad5
      - listitem [ref=e68]:
        - link "E2E Like 1784535252211 Playwright User" [ref=e69] [cursor=pointer]:
          - /url: /blogs/6a5dd8d66b3e5937d78d7ade
      - listitem [ref=e70]:
        - link "E2E Test Blog 1784536275480 Playwright Test Author" [ref=e71] [cursor=pointer]:
          - /url: /blogs/6a5ddcd46b3e5937d78d7afc
      - listitem [ref=e72]:
        - link "Like Test Blog 1784536289234 Like Test Author" [ref=e73] [cursor=pointer]:
          - /url: /blogs/6a5ddce16b3e5937d78d7b07
      - listitem [ref=e74]:
        - link "E2E Create 1784536309648 Playwright User" [ref=e75] [cursor=pointer]:
          - /url: /blogs/6a5ddcf66b3e5937d78d7b36
      - listitem [ref=e76]:
        - link "E2E Like 1784536316754 Playwright User" [ref=e77] [cursor=pointer]:
          - /url: /blogs/6a5ddcfd6b3e5937d78d7b41
      - listitem [ref=e78]:
        - link "E2E Test Blog 1784536387539 Playwright Test Author" [ref=e79] [cursor=pointer]:
          - /url: /blogs/6a5ddd456b3e5937d78d7b6d
      - listitem [ref=e80]:
        - link "Like Test Blog 1784536406711 Like Test Author" [ref=e81] [cursor=pointer]:
          - /url: /blogs/6a5ddd586b3e5937d78d7b76
      - listitem [ref=e82]:
        - link "E2E Test Blog 1784536438352 Playwright Test Author" [ref=e83] [cursor=pointer]:
          - /url: /blogs/6a5ddd776b3e5937d78d7ba1
      - listitem [ref=e84]:
        - link "Like Test Blog 1784536445506 Like Test Author" [ref=e85] [cursor=pointer]:
          - /url: /blogs/6a5ddd7f6b3e5937d78d7baf
      - listitem [ref=e86]:
        - link "E2E Create 1784536496546 Playwright User" [ref=e87] [cursor=pointer]:
          - /url: /blogs/6a5dddb26b3e5937d78d7bf9
      - listitem [ref=e88]:
        - link "E2E Like 1784536503507 Playwright User" [ref=e89] [cursor=pointer]:
          - /url: /blogs/6a5dddb96b3e5937d78d7c08
      - listitem [ref=e90]:
        - link "E2E Create 1784536509223 Playwright User" [ref=e91] [cursor=pointer]:
          - /url: /blogs/6a5dddbf6b3e5937d78d7c12
      - listitem [ref=e92]:
        - link "E2E Like 1784536526045 Playwright User" [ref=e93] [cursor=pointer]:
          - /url: /blogs/6a5dddcf6b3e5937d78d7c2d
      - listitem [ref=e94]:
        - link "E2E Test Blog 1784536595348 Playwright Test Author" [ref=e95] [cursor=pointer]:
          - /url: /blogs/6a5dde156b3e5937d78d7c51
      - listitem [ref=e96]:
        - link "Like Test Blog 1784536609015 Like Test Author" [ref=e97] [cursor=pointer]:
          - /url: /blogs/6a5dde226b3e5937d78d7c5e
      - listitem [ref=e98]:
        - link "E2E Create 1784536664986 Playwright User" [ref=e99] [cursor=pointer]:
          - /url: /blogs/6a5dde5a6b3e5937d78d7c8f
      - listitem [ref=e100]:
        - link "E2E Like 1784536673207 Playwright User" [ref=e101] [cursor=pointer]:
          - /url: /blogs/6a5dde626b3e5937d78d7c9c
```

# Test source

```ts
  1   | const { test, expect, beforeEach, describe } = require("@playwright/test");
  2   | 
  3   | const baseURL = "http://127.0.0.1:5174";
  4   | const credentials = {
  5   |   username: "developer",
  6   |   password: "kase133246557",
  7   | };
  8   | 
  9   | async function login(page) {
  10  |   await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  11  |   await page.evaluate(() => window.localStorage.clear());
  12  |   await page.reload({ waitUntil: "domcontentloaded" });
  13  | 
  14  |   await page.getByRole("link", { name: /login/i }).click();
> 15  |   await page.locator('input[name="Username"]').fill(credentials.username);
      |                                                ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  16  |   await page.locator('input[name="Password"]').fill(credentials.password);
  17  |   await page.getByRole("button", { name: /login/i }).click();
  18  | 
  19  |   await page.waitForURL(/\/(?:$|\?)/, { timeout: 20000 });
  20  |   await expect(page).toHaveURL(baseURL + "/", { timeout: 20000 });
  21  |   await expect(page.getByRole("link", { name: /new blog/i })).toBeVisible({
  22  |     timeout: 20000,
  23  |   });
  24  | }
  25  | 
  26  | describe("Blog app", () => {
  27  |   beforeEach(async ({ page }) => {
  28  |     await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  29  |     await page.evaluate(() => window.localStorage.clear());
  30  |     await page.reload({ waitUntil: "domcontentloaded" });
  31  |   });
  32  | 
  33  |   test("Login form is shown", async ({ page }) => {
  34  |     await page.getByRole("link", { name: /login/i }).click();
  35  |     await expect(page.getByText("Log in to application")).toBeVisible();
  36  |     await expect(page.locator('input[name="Username"]')).toBeVisible();
  37  |     await expect(page.locator('input[name="Password"]')).toBeVisible();
  38  |     await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
  39  |   });
  40  | 
  41  |   test("Login succeeds with correct credentials", async ({ page }) => {
  42  |     await page.getByRole("link", { name: /login/i }).click();
  43  |     await page.locator('input[name="Username"]').fill(credentials.username);
  44  |     await page.locator('input[name="Password"]').fill(credentials.password);
  45  |     await page.getByRole("button", { name: /login/i }).click();
  46  | 
  47  |     await page.waitForURL(/\/(?:$|\?)/, { timeout: 20000 });
  48  |     await expect(page).toHaveURL(baseURL + "/", { timeout: 20000 });
  49  |     await expect(page.getByRole("link", { name: /new blog/i })).toBeVisible({
  50  |       timeout: 20000,
  51  |     });
  52  |     await expect(page.getByRole("button", { name: /logout/i })).toBeVisible({
  53  |       timeout: 20000,
  54  |     });
  55  |   });
  56  | 
  57  |   test("Login fails with wrong credentials", async ({ page }) => {
  58  |     await page.getByRole("link", { name: /login/i }).click();
  59  |     await page.locator('input[name="Username"]').fill(credentials.username);
  60  |     await page.locator('input[name="Password"]').fill("wrong");
  61  |     await page.getByRole("button", { name: /login/i }).click();
  62  | 
  63  |     await expect(page.getByText(/wrong username or password/i)).toBeVisible({
  64  |       timeout: 15000,
  65  |     });
  66  |     await expect(page).toHaveURL(baseURL + "/login", { timeout: 15000 });
  67  |   });
  68  | });
  69  | 
  70  | describe("When logged in", () => {
  71  |   test("a new blog can be created", async ({ page }) => {
  72  |     await login(page);
  73  | 
  74  |     const timestamp = Date.now();
  75  |     const title = `E2E Create ${timestamp}`;
  76  |     const author = "Playwright User";
  77  | 
  78  |     await page.getByRole("link", { name: /new blog/i }).click();
  79  |     await page.locator('input[name="Title"]').fill(title);
  80  |     await page.locator('input[name="Author"]').fill(author);
  81  |     await page.locator('input[name="Url"]').fill("https://example.com");
  82  |     await page.getByRole("button", { name: /^create$/i }).click();
  83  | 
  84  |     await expect(page).toHaveURL(baseURL + "/");
  85  |     await expect(
  86  |       page.getByRole("link", { name: new RegExp(title) }),
  87  |     ).toBeVisible({ timeout: 15000 });
  88  |   });
  89  | 
  90  |   test("a blog can be liked", async ({ page }) => {
  91  |     await login(page);
  92  | 
  93  |     const timestamp = Date.now();
  94  |     const title = `E2E Like ${timestamp}`;
  95  |     const author = "Playwright User";
  96  | 
  97  |     await page.getByRole("link", { name: /new blog/i }).click();
  98  |     await page.locator('input[name="Title"]').fill(title);
  99  |     await page.locator('input[name="Author"]').fill(author);
  100 |     await page.locator('input[name="Url"]').fill("https://example.com");
  101 |     await page.getByRole("button", { name: /^create$/i }).click();
  102 | 
  103 |     await page
  104 |       .locator("li")
  105 |       .filter({ hasText: title })
  106 |       .filter({ hasText: author })
  107 |       .getByRole("link")
  108 |       .first()
  109 |       .click();
  110 | 
  111 |     await expect(
  112 |       page.getByRole("heading", { name: new RegExp(title) }),
  113 |     ).toBeVisible({
  114 |       timeout: 15000,
  115 |     });
```