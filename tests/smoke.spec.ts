import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { siteConfig } from "../src/config";

// One-page PDF fixture; the suite never fetches the live resume.
const resume = Buffer.from(
  "JVBERi0xLjQKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEgPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCAzMDAgMzAwXSAvUmVzb3VyY2VzIDw8IC9Gb250IDw8IC9GMSA1IDAgUiA+PiA+PiAvQ29udGVudHMgNCAwIFIgPj4KZW5kb2JqCjQgMCBvYmoKPDwgL0xlbmd0aCA0NiA+PgpzdHJlYW0KQlQgL0YxIDE4IFRmIDQwIDIwMCBUZCAoRml4dHVyZSByZXN1bWUpIFRqIEVUCmVuZHN0cmVhbQplbmRvYmoKNSAwIG9iago8PCAvVHlwZSAvRm9udCAvU3VidHlwZSAvVHlwZTEgL0Jhc2VGb250IC9IZWx2ZXRpY2EgPj4KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDI0MSAwMDAwMCBuIAowMDAwMDAwMzM2IDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgNiAvUm9vdCAxIDAgUiA+PgpzdGFydHhyZWYKNDA2CiUlRU9GCg==",
  "base64"
);

test.beforeEach(async ({ page }) => {
  await page.route(siteConfig.resume.url, route => route.fulfill({ contentType: "application/pdf", body: resume }));
  await page.route("**/relay-buRP/**", route => route.abort());
});

test("navigation and language switching preserve the current page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Experience", exact: true }).click();
  await expect(page).toHaveURL("/experience");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Experience");

  await page.getByRole("button", { name: "Select language" }).click();
  await page.getByRole("menuitemradio", { name: /简体中文/ }).click();
  await expect(page).toHaveURL(`/zh-SG/${encodeURIComponent("经历")}`);
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-SG");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("工作经历");

  await page.getByRole("button", { name: "选择语言" }).click();
  await page.getByRole("menuitemradio", { name: /English/ }).click();
  await expect(page).toHaveURL("/experience");
  await expect(page.locator("html")).toHaveAttribute("lang", "en-SG");
});

test("resume dialog renders and downloads the PDF", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "View resume" });
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Here's my resume" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(".react-pdf__Page__canvas")).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await dialog.getByRole("button", { name: "Download" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("Yip_JunKai_Resume.pdf");
  expect(await readFile(await download.path())).toEqual(resume);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("mobile menu navigates and changes the theme", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Toggle navigation menu" });
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");

  await page.getByRole("button", { name: "Change theme to dark" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Change theme to light" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL("/projects");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projects");
});
