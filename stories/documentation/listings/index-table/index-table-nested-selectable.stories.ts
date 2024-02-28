import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'lu-index-table-nested-selectable',
	standalone: true,
	templateUrl: './index-table-nested-selectable.stories.html',
})
class IndexTableNestedSelectableStory {
	toggleRow() {
		alert('Row toggled');
	}
}

export default {
	title: 'Documentation/Listings/Index Table/Nested Selectable',
	component: IndexTableNestedSelectableStory,
} as Meta;

const Template: StoryFn<IndexTableNestedSelectableStory> = (args) => ({
	props: args,
});

export const NestedSelectable = Template.bind({});
NestedSelectable.args = {};
