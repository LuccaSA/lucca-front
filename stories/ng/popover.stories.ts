import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuPopoverModule } from '@lucca-front/ng/popover';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	template: `
<button class="button" [luPopover]="popover">click me</button>
<lu-popover #popover>I am a popover</lu-popover>
`,
}) class PopoverStory {}

export default {
  title: 'NG/Popover',
  component: PopoverStory,
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