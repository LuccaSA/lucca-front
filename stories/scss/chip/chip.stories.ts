import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'chip-stories',
	templateUrl: './chip.stories.html',
}) class ChipStory {
	@Input() label: string;
	@Input() mod: string = '';
}


export default {
	title: 'SCSS/Chip',
	component: ChipStory,
	argTypes: {
		mod: {
			options: ['', 'mod-unkillable'],
			control: {
				type: 'radio',
			}
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [ChipStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<ChipStory> = (args: ChipStory) => ({
	props: args,
});

export const def = template.bind({});
def.args = { label: 'label', mod: ''};

