import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DividerComponent } from '@lucca-front/ng/divider';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'divider-stories',
	templateUrl: './divider.stories.html',
	imports: [DividerComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DividerStory {}

export default {
	title: 'QA/Divider',
	component: DividerStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<DividerStory> = {
	args: {},
	render: template,
};
