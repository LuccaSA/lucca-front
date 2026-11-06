import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { createTestStory } from '@/helpers/stories';
import { mapInputs, waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/overlays/tooltip/tooltip.stories';

export default {
	...meta,
	title: 'E2E/Tooltip/Basic',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(
	{
		...Basic,
		args: {
			...Basic.args,
			luTooltipEnterDelay: 0,
			luTooltipLeaveDelay: 0,
		},
	},
	async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const inputs = canvas.getAllByRole('button');

		// Map inputs to named references
		const { button, span } = mapInputs(inputs, {
			button: 0,
			span: 1,
		});

		await step('ButtonTooltip', async () => {
			await step('Focus', async () => {
				button.focus();
				await expect(button).toHaveFocus();
				await waitFor(
					() => {
						expect(screen.queryByRole('tooltip')).toBeInTheDocument();
					},
					{ timeout: 1000 },
				);
				button.blur();
				await waitForAngular();
			});

			await step('Hover', async () => {
				await userEvent.hover(button);
				await waitFor(
					() => {
						expect(screen.queryByRole('tooltip')).toBeInTheDocument();
					},
					{ timeout: 1000 },
				);
			});

			await step('Unhover', async () => {
				await userEvent.unhover(button);
				await waitFor(
					() => {
						expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
					},
					{ timeout: 1000 },
				);
			});
		});

		await step('SpanTooltip', async () => {
			await step('Focus', async () => {
				span.focus();
				await expect(span).toHaveFocus();
				await waitFor(
					() => {
						expect(screen.getByRole('tooltip')).toBeVisible();
					},
					{ timeout: 1000 },
				);
				span.blur();
				await waitForAngular();
			});
		});

		await step('IconTooltip', async () => {
			const icon = canvas.getByTestId('icon-tooltip');

			await step('Hover', async () => {
				await userEvent.hover(icon);
				await waitFor(
					() => {
						expect(screen.getByRole('tooltip')).toBeVisible();
					},
					{ timeout: 1000 },
				);
			});

			await step('Unhover', async () => {
				await userEvent.unhover(icon);
				await waitFor(
					() => {
						expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
					},
					{ timeout: 1000 },
				);
			});
		});
	},
);
