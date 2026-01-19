import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'forms-switch-legacy-stories',
	templateUrl: './switch-legacy.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SwitchLegacyStory {}

export default {
	title: 'QA/Forms/SwitchLegacy',
	component: SwitchLegacyStory,
	decorators: [
		moduleMetadata({
			entryComponents: [SwitchLegacyStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<SwitchLegacyStory> = {
	args: {},
	render: template,
};
