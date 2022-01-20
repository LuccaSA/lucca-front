import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuPopoverModule } from '@lucca-front/ng/popover';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'popover-stories',
	template: `
<button class="button mod-outline">don't click me</button>
<button class="button"
	[luPopover]="popover"
	[luPopoverPosition]="position"
	[luPopoverAlignment]="alignement"
	[luPopoverTrigger]="trigger"
>{{trigger}} me</button>
<button class="button mod-outline">don't click me either</button>
<lu-popover #popover>{{popoverContent}}</lu-popover>
`,
}) class PopoverStory {
	@Input() popoverContent: string;
	@Input() position: string;
	@Input() alignment: string;
	@Input() trigger: string;
}

export default {
  title: 'NG/Popover',
  component: PopoverStory,
	argTypes: {
		position: {
			options: ['above', 'below', 'before', 'after'],
			control: {
				type: 'radio',
			}
		},
		alignment: {
			options: ['top', 'bottom', 'left', 'right', 'center'],
			control: {
				type: 'radio',
			}
		},
		trigger: {
			options: ['none', 'hover', 'focus', 'click'],
			control: {
				type: 'radio',
			}
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [PopoverStory],
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
basic.args = {
	popoverContent: 'popover content',
	position: 'below',
	alignment: 'center',
	trigger: 'click',
}

export const hover = template.bind({});
hover.args = {
	popoverContent: 'popover content',
	position: 'below',
	alignment: 'center',
	trigger: 'hover',
}

export const focus = template.bind({});
focus.args = {
	popoverContent: 'popover content',
	position: 'below',
	alignment: 'center',
	trigger: 'focus',
}