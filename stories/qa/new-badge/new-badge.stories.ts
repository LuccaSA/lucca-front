import { Component } from '@angular/core';
import { NewBadgeComponent } from '@lucca-front/ng/new-badge';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'new-badge-stories',
	templateUrl: './new-badge.stories.html',
	imports: [NewBadgeComponent],
})
class NewBadgeStory {}

export default {
	title: 'QA/NewBadge',
	component: NewBadgeStory,
	decorators: [
		moduleMetadata({
			entryComponents: [NewBadgeStory],
		}),
	],
} as Meta;

const template: StoryFn<NewBadgeStory> = () => ({});

export const basic = template.bind({});
