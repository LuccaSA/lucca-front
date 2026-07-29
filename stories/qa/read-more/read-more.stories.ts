import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReadMoreComponent } from '@lucca-front/ng/read-more';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'read-more-stories',
	templateUrl: './read-more.stories.html',
	imports: [ReadMoreComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReadMoreStory {}

export default {
	title: 'QA/ReadMore',
	component: ReadMoreStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<ReadMoreStory> = {
	args: {},
	render: template,
};
