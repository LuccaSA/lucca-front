import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'card-basic-stories',
	templateUrl: './card-basic.stories.html',
})
class CardBasicStory {
	@Input() appearance: object = [];
	@Input() cardTitle: string = '';
	@Input() cardContent: string = '';
	@Input() hasFooter: boolean = false;
	@Input() isClickable: boolean = false;
	@Input() mainButton: string = '';
	@Input() secondaryButton: string = '';
}

export default {
	title: 'SCSS/Card/Basic',
	component: CardBasicStory,
	argTypes: {
		appearance: {
			options: ['mod-grey', 'mod-elevated', 'is-disabled'],
			control: {
				type: 'check',
			},
		},
		hasFooter: {
			control: {
				type: 'boolean',
			},
		},
		isClickable: {
			control: {
				type: 'boolean',
			},
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [CardBasicStory],
			imports: [BrowserModule],
		}),
	],
} as Meta;

const template: Story<CardBasicStory> = (args: CardBasicStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {
	appearance: [],
	cardTitle: 'My Card',
	cardContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus commodo ornare. Proin eget iaculis lacus, a varius erat. Nulla facilisi. Sed eget scelerisque urna. Etiam eget sem accumsan, venenatis purus nec, dignissim ex.',
	hasFooter: false,
	isClickable: false,
	mainButton: 'Confirm',
	secondaryButton: 'Cancel',
};
