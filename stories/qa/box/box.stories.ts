import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoxComponent } from '@lucca-front/ng/box';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'box-stories',
	templateUrl: './box.stories.html',
	imports: [BoxComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class BoxStory {}

export default {
	title: 'QA/Box',
	component: BoxStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<BoxStory> = {
	args: {},
	render: template,
};
