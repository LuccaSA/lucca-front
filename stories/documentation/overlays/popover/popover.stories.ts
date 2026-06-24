import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LuPopoverAlignment, LuPopoverModule, LuPopoverPosition, LuPopoverTriggerEvent } from '@lucca-front/ng/popover';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { createTestStory } from 'stories/helpers/stories';
import { sleep, waitForAngular } from 'stories/helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';

@Component({
	selector: 'popover-story',
	imports: [LuPopoverModule],
	template: `
		<button type="button" class="button" [luPopover]="popover" [luPopoverPosition]="position()" [luPopoverAlignment]="alignment()" [luPopoverTrigger]="trigger()">{{ trigger() }} me</button>
		<lu-popover #popover>{{ popoverContent() }}</lu-popover>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PopoverStory {
	popoverContent = input<string>('🎉 popover content 🏖️');
	position = input<LuPopoverPosition>('above');
	alignment = input<LuPopoverAlignment>('top');
	trigger = input<LuPopoverTriggerEvent>('click');
}

export default {
	title: 'Documentation/Overlays/Popover',
	component: PopoverStory,
	decorators: [applicationConfig({ providers: [] })],
} as Meta;

const code = `
/* 1. Importer LuPopoverModule */
import { LuPopoverModule } from '@lucca-front/ng/popover';

@NgModule({
	imports: [LuPopoverModule]
})
class PopoverStoriesModule {}

/* 2. Utiliser lu-popover */
@Component({
	selector: 'popover-story',
	template: \`
		<button type="button" class="button" [luPopover]="popover">Click me</button>
		<lu-popover #popover>🎉 popover content 🏖️</lu-popover>
	\`
})
class PopoverStory {
	popoverContent = input<string>('🎉 popover content 🏖️');
	position = input<LuPopoverPosition>('above');
	alignment = input<LuPopoverAlignment>('top');
	trigger = input<LuPopoverTriggerEvent>('click');
}`;

export const Basic: StoryObj<PopoverStory> = {
	args: {},
};
Basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Ouvre le popover', async () => {
		await userEvent.click(canvas.getByRole('button'));
		await sleep(500);
		await expect(screen.getByText('🎉 popover content 🏖️')).toBeVisible();
	});

	await step('Ferme avec Escape', async () => {
		await userEvent.keyboard('{Escape}');
		await sleep(500);
		await expect(screen.queryByText('🎉 popover content 🏖️')).not.toBeInTheDocument();
	});
});
