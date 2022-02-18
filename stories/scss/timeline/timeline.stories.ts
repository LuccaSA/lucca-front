import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'timeline-stories',
	templateUrl: './timeline.stories.html',
})
class TimelineStory {
	@Input() isVertical: boolean;
	@Input() isStep: boolean;
	@Input() isAddStep: boolean;
	@Input() isAddBetweenStep: boolean;
	@Input() isNumber: boolean;
	@Input() isCheckedPastStep: boolean;

	@Input() stepProgress: number;

	@Input() size: string;
	@Input() hx: string;
}

export default {
	title: 'SCSS/Timeline',
	component: TimelineStory,
	argTypes: {
		size: {
			control: {
				type: 'radio',
				options: ['', 'mod-small', 'mod-big'],
			},
		},
		hx: {
			control: {
				type: 'radio',
				options: ['', 'u-h1', 'u-h2'],
			},
		},
		stepProgress: {
			control: {
				type: 'range',
				min: 0,
				max: 100,
				step: 5,
			},
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [TimelineStory],
			imports: [BrowserModule],
		}),
	],
} as Meta;

const template: Story<TimelineStory> = (args: TimelineStory) => ({
	props: args,
});

export const def = template.bind({});
def.args = {
	isVertical: false,
	size: '',
	isStep: false,
	isAddStep: false,
	hx: '',
	stepProgress: 0,
	isAddBetweenStep: false,
	isNumber: false,
	isCheckedPastStep: false,
};
