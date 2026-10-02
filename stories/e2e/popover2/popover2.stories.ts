import { StoryObj } from '@storybook/angular-vite';
import { waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';
import { createTestStory, generateInputs } from '@/helpers/stories';
import meta, { type PopoverStoryArgs, Basic } from '@/stories/overlays/popover2/popover2.stories';

export default {
	...meta,
	title: 'E2E/Popover2',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	const canvas = within(canvasElement);
	const button = await canvas.findByRole('button');

	await step('Mouse interaction', async () => {
		await userEvent.click(button);
		await waitForAngular();
		await expect(screen.getByRole('list')).toBeVisible();
		await userEvent.click(button);
		await expect(screen.queryByText('list')).toBeNull();
		await waitForAngular();
	});

	await step('Keyboard interactions', async () => {
		button.focus();
		await expect(button).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(screen.getByRole('list')).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await expect(screen.queryByText('list')).toBeNull();
	});
});

// Regression guard for #5396: since Angular 22.1.4, a dynamically created host inherits the namespace of its view container,
// so a popover opened from an SVG trigger was created as an invisible SVG element.
const SvgTrigger: StoryObj<PopoverStoryArgs> = {
	name: 'SVG trigger',
	render: (args, { argTypes }) => ({
		template: `<div class="demo">
	<svg class="gauge" width="80" height="80" viewBox="0 0 80 80" style="--components-gauge-value: 33; --components-gauge-circleR: 36px">
		<circle class="gauge-circleBackground" cx="40" cy="40" r="36" />
		<circle class="gauge-circleBar" cx="40" cy="40" r="36" tabindex="0" role="button" aria-label="SVG trigger" [luPopover2]="contentRef" ${generateInputs(args, argTypes)} />
	</svg>
	<ng-template #contentRef>
		<div class="popover-contentOptional">Opened from an SVG element</div>
	</ng-template>
</div>
`,
		styles: [
			`
	.demo {
		display: flex;
		min-block-size: 20rem;
		align-items: center;
		justify-content: center;
	}`,
		],
	}),
	args: {
		luPopoverTrigger: 'click',
		luPopoverDisabled: false,
		luPopoverPosition: 'above',
	},
};

export const SvgTriggerTEST = createTestStory(SvgTrigger, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const trigger = await canvas.findByRole('button', { name: 'SVG trigger' });

	await step('Mouse interaction opens a visible popover', async () => {
		await userEvent.click(trigger);
		await waitForAngular();

		const content = screen.getByText('Opened from an SVG element');
		await expect(content).toBeVisible();
		// toBeVisible() doesn't catch an element without layout: the regression rendered the popover as a 0×0 box
		const { width, height } = content.getBoundingClientRect();
		await expect(width).toBeGreaterThan(0);
		await expect(height).toBeGreaterThan(0);

		const popoverContent = content.closest('lu-popover-content');
		await expect(popoverContent?.namespaceURI).toBe('http://www.w3.org/1999/xhtml');
		await expect(trigger).toHaveAttribute('aria-expanded', 'true');
	});

	await step('Keyboard interaction closes the popover', async () => {
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.queryByText('Opened from an SVG element')).toBeNull();
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
		await expect(trigger).toHaveFocus();
	});
});
