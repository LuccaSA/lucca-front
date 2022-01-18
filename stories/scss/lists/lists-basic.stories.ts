import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'lists-basic-stories',
	templateUrl: './lists-basic.stories.html',
}) class ListsBasicStory {
	@Input() listTitle: string;
	@Input() listContent: string;
	@Input() mod: string = '';
	@Input() hasActions: boolean;

	lists = [
		{ listTitle: 'List item title', listContent: 'List item description' },
		{ listTitle: 'List item title', listContent: 'List item description' },
		{ listTitle: 'List item title', listContent: 'List item description' },
		{ listTitle: 'List item title', listContent: 'List item description' },
	];
}

export default {
	title: 'SCSS/Lists/Basic',
	component: ListsBasicStory,
	argTypes: {
		mod: {
			control: {
				type: 'radio',
				options: ['', 'mod-clickable', 'mod-draggable']
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
	listTitle: 'List item title',
	listContent: 'List item description',
	mod: '',
	hasActions: true,
};
