import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'secondary-nav-stories',
	templateUrl: './secondary-nav.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SecondaryNavStory {}

export default {
	title: 'QA/SecondaryNav',
	component: SecondaryNavStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<SecondaryNavStory> = {
	args: {},
	render: template,
};
