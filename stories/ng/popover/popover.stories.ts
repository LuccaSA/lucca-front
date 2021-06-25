import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuPopoverModule } from '@lucca-front/ng/popover';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'popover-stories',
	template: `
<button class="button"
	[luPopover]="popover"
	[luPopoverPosition]="position"
>click me</button>
<lu-popover #popover>{{popoverContent}}</lu-popover>
`,
}) class PopoverStory {
	@Input() popoverContent: string;
	@Input() position: string;
}

export default {
  title: 'NG/Popover',
  component: PopoverStory,
	argTypes: {
		position: {
			control: {
				type: 'radio',
				options: ['above', 'below', 'before', 'after']
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
}