import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { moduleMetadata } from '@storybook/angular-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import meta, { Basic } from '@/stories/overlays/tooltip/tooltip.stories';

export default {
	...meta,
	title: 'E2E/Tooltip/HiddenTrigger',
	tags: ['!autodocs'],
};

// Inline triggers on purpose: a ResizeObserver never notifies for them, their content box is always empty.
const HiddenTrigger = {
	...Basic,
	decorators: [moduleMetadata({ imports: [CdkDrag, CdkDropList] })],
	render: () => ({
		template: `
			<div data-testid="hidden-card"><span luTooltip="Hidden" luTooltipEnterDelay="1" luTooltipLeaveDelay="1">Hidden trigger</span></div>
			<div data-testid="removed-card"><span luTooltip="Removed" luTooltipEnterDelay="1" luTooltipLeaveDelay="1">Removed trigger</span></div>
			<div cdkDropList>
				<div cdkDrag data-testid="dragged-card"><span luTooltip="Dragged" luTooltipEnterDelay="1" luTooltipLeaveDelay="1">Dragged trigger</span></div>
			</div>
		`,
	}),
};

const tooltip = (name: string) => screen.queryByText(name, { selector: '.tooltip' });

// No mouseleave in any step: the trigger leaves from under a still pointer.
export const HiddenTriggerTEST = createTestStory(HiddenTrigger, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	const hoverUntilOpen = async (trigger: HTMLElement, name: string) => {
		await userEvent.hover(trigger);
		await waitFor(() => expect(tooltip(name)).toBeVisible());
	};

	await step('Closes when an ancestor of the trigger is hidden', async () => {
		const card = canvas.getByTestId('hidden-card');
		await hoverUntilOpen(within(card).getByText('Hidden trigger'), 'Hidden');

		card.style.display = 'none';
		await waitFor(() => expect(tooltip('Hidden')).toBeNull());
	});

	await step('Closes when the trigger is removed from the document', async () => {
		const card = canvas.getByTestId('removed-card');
		await hoverUntilOpen(within(card).getByText('Removed trigger'), 'Removed');

		card.remove();
		await waitFor(() => expect(tooltip('Removed')).toBeNull());
	});

	await step('Closes when the CDK starts dragging the element that holds the trigger', async () => {
		const card = canvas.getByTestId('dragged-card');
		const trigger = within(card).getByText('Dragged trigger');
		await hoverUntilOpen(trigger, 'Dragged');

		const { left, top } = trigger.getBoundingClientRect();
		// `buttons` and `detail` set: the CDK takes a mousedown without them for a screen reader's fake one
		trigger.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 0, buttons: 1, detail: 1, clientX: left, clientY: top }));
		// past the CDK drag start threshold
		document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, buttons: 1, clientX: left + 50, clientY: top + 50 }));
		await waitFor(() => expect(document.querySelector('.cdk-drag-preview')).not.toBeNull());
		await waitFor(() => expect(tooltip('Dragged')).toBeNull());

		document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: left + 50, clientY: top + 50 }));
		await waitForAngular();
	});
});
