import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'section-stories',
	templateUrl: './section.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SectionStory {}

export default {
	title: 'QA/Section',
	component: SectionStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<SectionStory> = {
	args: {},
	render: template,
};
