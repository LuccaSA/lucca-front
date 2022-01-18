import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'tags-stories',
	templateUrl: './tags.stories.html',
}) class TagsStory {
	@Input() label: string;
	@Input() mod: string = '';
	@Input() palette: string = '';
}

export default {
	title: 'SCSS/Tags',
	component: TagsStory,
	argTypes: {
		mod: {
			control: {
				type: 'radio',
				options: ['', ' mod-clickable']
			}
		},
		palette: {
			control: {
				type: 'radio',
				options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error']
			}
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [TagsStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<TagsStory> = (args: TagsStory) => ({
	props: args,
});

export const def = template.bind({});
def.args = { label: 'label', mod: '', palette: '' };


