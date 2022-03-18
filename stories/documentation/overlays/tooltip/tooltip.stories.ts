import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'tooltip-stories',
	templateUrl: './tooltip.stories.html',
}) class TooltipStory {
}

export default {
  title: 'Documentation/Overlays/Tooltip/Focus',
  component: TooltipStory,
	decorators: [
		moduleMetadata({
			entryComponents: [TooltipStory],
			imports: [
				LuTooltipModule,
				BrowserAnimationsModule,
			]
		})
	]
} as Meta;

const template: Story<TooltipStory> = (args: TooltipStory) => ({
  props: args,
});

export const basic = template.bind({});
basic.args = {}
