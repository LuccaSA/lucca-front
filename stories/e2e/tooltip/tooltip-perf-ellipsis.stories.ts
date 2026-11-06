import { createTestStory } from '@/helpers/stories';
import { sleep } from '@/helpers/test';
import { expect, waitFor, within } from 'storybook/test';
import meta, { Basic } from '@/stories/overlays/tooltip/tooltip-perf-ellipsis.stories';

export default {
	...meta,
	title: 'E2E/Tooltip/PerfEllipsis',
	tags: ['!autodocs'],
};

/**
 * Reads Chrome's style recalculation counter through the CDP session Vitest's browser mode exposes.
 * Returns `null` anywhere else (the Storybook UI, most notably), where the story still runs but
 * has nothing to measure.
 */
async function connectStyleRecalcCounter(): Promise<(() => Promise<number>) | null> {
	try {
		const { cdp } = await import('vitest/browser');
		const session = cdp();
		await session.send('Performance.enable');
		return async () => {
			const { metrics } = (await session.send('Performance.getMetrics')) as { metrics: { name: string; value: number }[] };
			return metrics.find((metric) => metric.name === 'RecalcStyleCount')?.value ?? 0;
		};
	} catch {
		return null;
	}
}

export const BasicTEST = createTestStory(Basic, async ({ canvasElement }) => {
	const readRecalcCount = await connectStyleRecalcCounter();
	if (!readRecalcCount) {
		return;
	}

	const canvas = within(canvasElement);
	const toggle = canvas.getByRole('button', { name: /Toggle tooltips/ });
	const cells = () => canvasElement.querySelectorAll('.cell');
	const measuredCells = () => canvasElement.querySelectorAll('.cell[tabindex="0"]');

	await waitFor(() => expect(measuredCells().length).toBeGreaterThan(0), { timeout: 5000 });
	await sleep(300);
	const measuredCount = measuredCells().length;

	toggle.click();
	await waitFor(() => expect(cells()).toHaveLength(0));
	await sleep(300);

	const before = await readRecalcCount();
	toggle.click();
	await waitFor(() => expect(measuredCells().length).toBe(measuredCount), { timeout: 5000 });
	await sleep(300);
	const recalculations = (await readRecalcCount()) - before;

	// Measuring the ellipsis must not read a live `CSSStyleDeclaration` outside the `earlyRead` phase:
	// doing so forces one style recalculation per tooltip on the page. This counter has to stay flat
	// whatever the number of tooltips — measured at 3 here, against 752 when the regression is in.
	await expect(recalculations, `${recalculations} recalculs de style pour ${measuredCount} tooltips remontés`).toBeLessThan(10);
});
