const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

async function captureAll() {
  const edgePath =
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

  const outDir = path.join(__dirname, "screenshots");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const routes = [
    { name: "home", path: "/" },
    { name: "story", path: "/story" },
    { name: "music", path: "/music" },
    { name: "visuals", path: "/visuals" },
    { name: "contact", path: "/contact" },
  ];

  const page = await browser.newPage();

  // 1. Capture Desktop Viewports (1440 x 900)
  for (const route of routes) {
    console.log(`Capturing Desktop: ${route.name} (${route.path})`);
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://localhost:3000${route.path}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });
    await new Promise((r) => setTimeout(r, 1200));

    // Scroll through page to trigger scroll triggers and decode images
    await page.evaluate(async () => {
      const step = 250;
      for (let pos = 0; pos <= document.body.scrollHeight; pos += step) {
        window.scrollTo(0, pos);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 1000));

    await page.screenshot({
      path: path.join(outDir, `${route.name}_desktop.png`),
      fullPage: true,
    });
  }

  // 2. Capture Mobile Viewports (iPhone 14: 390 x 844)
  for (const route of routes) {
    console.log(`Capturing Mobile: ${route.name} (${route.path})`);
    await page.setViewport({ width: 390, height: 844, isMobile: true });
    await page.goto(`http://localhost:3000${route.path}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });
    await new Promise((r) => setTimeout(r, 1200));

    await page.evaluate(async () => {
      const step = 300;
      for (let pos = 0; pos <= document.body.scrollHeight; pos += step) {
        window.scrollTo(0, pos);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 600));

    await page.screenshot({
      path: path.join(outDir, `${route.name}_mobile.png`),
      fullPage: true,
    });
  }

  // 3. Test Visuals Lightbox Interaction
  console.log("Testing Lightbox Modal on /visuals");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/visuals", {
    waitUntil: "networkidle0",
  });
  await new Promise((r) => setTimeout(r, 1000));
  // Click first gallery item
  const firstItem = await page.$(".group.relative.cursor-pointer");
  if (firstItem) {
    await firstItem.click();
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(outDir, "visuals_lightbox_desktop.png"),
      fullPage: false,
    });
  }

  await browser.close();
  console.log("All routes and interactions captured successfully!");
}

captureAll().catch((err) => {
  console.error("Error during captures:", err);
  process.exit(1);
});
