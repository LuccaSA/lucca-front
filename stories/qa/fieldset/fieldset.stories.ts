import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldsetComponent } from '@lucca-front/ng/forms';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'fieldset-stories',
	templateUrl: './fieldset.stories.html',
	imports: [FieldsetComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class fieldsetStory {}

export default {
	title: 'QA/fieldset',
	component: fieldsetStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<fieldsetStory> = {
	args: {},
	render: template,
};
