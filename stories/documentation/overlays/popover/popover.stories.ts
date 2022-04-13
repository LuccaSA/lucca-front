import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	LuPopoverAlignment,
	LuPopoverModule, LuPopoverPanelComponent,
	LuPopoverPosition,
	LuPopoverTriggerDirective,
	LuPopoverTriggerEvent,
} from '@lucca-front/ng/popover';
import { Story, Meta, moduleMetadata, componentWrapperDecorator } from '@storybook/angular';

@Component({
	selector: 'popover-mock-directive-story',
	template: `
`,
}) class PopoverMockDirectiveStory extends LuPopoverTriggerDirective {
}


@Component({
	selector: 'popover-story',
	template: `
		<button class="button"
		[luPopover]="popover"
		[luPopoverPosition]="position"
		[luPopoverAlignment]="alignment"
		[luPopoverTrigger]="trigger"
		>{{trigger}} me</button>
		<lu-popover #popover="LuPopoverPanel">{{popoverContent}}</lu-popover>
`,
}) class PopoverStory {
	@Input() popoverContent: string = '🎉 popover content 🏖️';
	@Input() position: LuPopoverPosition = 'above';
	@Input() alignment: LuPopoverAlignment = 'top';
	@Input() trigger: LuPopoverTriggerEvent = 'click';
}

export default {
  title: 'Documentation/Overlays/Popover',
  component: PopoverMockDirectiveStory,
	decorators: [
		componentWrapperDecorator(PopoverStory),
		moduleMetadata({
			declarations: [PopoverStory, PopoverMockDirectiveStory],
			imports: [
				LuPopoverModule,
				BrowserAnimationsModule,
			]
		})
	]
} as Meta;

const template: Story<PopoverStory> = (args: PopoverStory) => ({
  props: args,
});

export const basic = template.bind({});
basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },

}

