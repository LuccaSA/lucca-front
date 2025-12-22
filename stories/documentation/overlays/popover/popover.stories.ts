import { Component, input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuPopoverAlignment, LuPopoverModule, LuPopoverPosition, LuPopoverTriggerEvent } from '@lucca-front/ng/popover';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'popover-story',
	imports: [LuPopoverModule],
	template: `
		<button type="button" class="button" [luPopover]="popover" [luPopoverPosition]="position()" [luPopoverAlignment]="alignment()" [luPopoverTrigger]="trigger()">{{ trigger() }} me</button>
		<lu-popover #popover>{{ popoverContent() }}</lu-popover>
	`,
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
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
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
