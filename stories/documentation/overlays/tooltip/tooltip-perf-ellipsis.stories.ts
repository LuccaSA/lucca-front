import { provideAnimations } from '@angular/platform-browser/animations';
import { LuTooltipModule, LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { createTestStory } from '@/helpers/stories';
import { sleep } from '@/helpers/test';
import { expect, waitFor, within } from 'storybook/test';

export default {
	title: 'Documentation/Overlays/Tooltip/Performance ellipsis',
	decorators: [
		applicationConfig({ providers: [provideAnimations()] }),
		moduleMetadata({
			imports: [LuTooltipModule],
		}),
	],
	render: () => {
		return {
			props: {
				rows: new Array(20),
				cols: new Array(25),
				showTooltips: true,
			},
			styles: [
				`.cell {
					inline-size: 120px;
					padding: 4px 8px;
					border: 1px solid;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.row {
					display: flex;
					gap: 1px;
				}`,
			],
			template: `
<h1>{{rows.length * cols.length}} ellipsis tooltips</h1>
<button (click)="showTooltips = !showTooltips">Toggle tooltips</button>
@if(showTooltips) {
	@for(x of rows; track $index)  {
		<div class="row">
			@for(y of cols; track $index)  {
					<div
						class="cell"
						luTooltip
						luTooltipWhenEllipsis
					>Lorem ipsum dolor sit amet consectetur adipisicing elit</div>
			}
		</div>
	}
}
`,
		};
	},
} as Meta;

export const Basic: StoryObj<LuTooltipTriggerDirective> = {};

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
