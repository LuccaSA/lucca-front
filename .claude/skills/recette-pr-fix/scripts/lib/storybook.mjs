// Shared helpers to drive Storybook stories of a deployed preview with Playwright.

// Storybook root of a preview, without a trailing /index.html.
export const trimPreviewUrl = (url) => url?.replace(/\/(index\.html)?$/, '');

// Opens a story in its iframe and waits for a stable render; null when the story does not exist in that preview.
export async function openStory(context, previewUrl, id) {
	const page = await context.newPage();
	await page.goto(`${previewUrl}/iframe.html?id=${id}&viewMode=story`, { waitUntil: 'networkidle' });
	const rendered = await page
		.waitForFunction(
			() => document.querySelector('#storybook-root')?.children.length || document.querySelector('.sb-show-errordisplay'),
			null,
			{ timeout: 15000 },
		)
		.then(() => page.evaluate(() => !document.body.classList.contains('sb-show-errordisplay')))
		.catch(() => false);
	if (!rendered) {
		await page.close();
		return null;
	}
	await page.evaluate(() => document.fonts.ready);
	return page;
}

// Context options shared by captures and reproductions: crisp 2x rendering, no motion, optional touch device.
export const contextOptions = ({ touch = false } = {}) => ({
	viewport: { width: 1280, height: 800 },
	deviceScaleFactor: 2,
	reducedMotion: 'reduce',
	hasTouch: touch,
	isMobile: touch,
});
