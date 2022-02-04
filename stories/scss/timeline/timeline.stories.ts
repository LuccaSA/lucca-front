import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'timeline-stories',
	templateUrl: './timeline.stories.html',
}) class TimelineStory {
	@Input() isVertical: boolean;
	@Input() isStep: boolean;
	@Input() isAddStep: boolean;
	@Input() isAddBetweenStep: boolean;
	@Input() isProgress: boolean;

	@Input() order: string;
	@Input() size: string;
}

export default {
	title: 'SCSS/Timeline',
	component: TimelineStory,
	argTypes: {
		size: {
			control: {
				type: 'radio',
				options: ['', 'mod-small', 'mod-big']
			}
		},
		order: {
			control: {
				type: 'radio',
				options: ['', 'mod-number', 'mod-checkedPastStep']
			}
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [TimelineStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<TimelineStory> = (args: TimelineStory) => ({
	props: args,
});

export const def = template.bind({});
def.args = { isVertical: false, size: '', isStep: false, order: '', isAddStep: false, isAddBetweenStep: false };


