import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'lists-basic-stories',
	templateUrl: './lists-basic.stories.html',
}) class ListsBasicStory {
	@Input() mod: string = '';
	@Input() hasActions: boolean;

	lists = [
		{ listTitle: 'List item title 1', listContent: 'List item description 1' },
		{ listTitle: 'List item title 2', listContent: 'List item description 2' },
		{ listTitle: 'List item title 3', listContent: 'List item description 3' },
		{ listTitle: 'List item title 4', listContent: 'List item description 4' },
	];
}

export default {
	title: 'SCSS/Lists/Basic',
	component: ListsBasicStory,
	argTypes: {
		mod: {
			options: ['', 'mod-clickable', 'mod-draggable'],
			control: {
				type: 'radio',
			}
		},
		hasActions: {
			control: {
				type: 'boolean',
			}
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [ListsBasicStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<ListsBasicStory> = (args: ListsBasicStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {
	mod: '',
	hasActions: true,
};
