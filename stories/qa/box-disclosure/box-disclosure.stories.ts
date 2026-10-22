import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoxDisclosureComponent } from '@lucca-front/ng/box';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'box-disclosure-stories',
	templateUrl: './box-disclosure.stories.html',
	imports: [BoxDisclosureComponent, IconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class BoxDisclosureStory {}

export default {
	title: 'QA/BoxDisclosure',
	component: BoxDisclosureStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<BoxDisclosureStory> = {
	args: {},
	render: template,
};
