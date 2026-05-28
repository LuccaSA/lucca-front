import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DividerComponent } from '@lucca-front/ng/divider';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'divider-stories',
	templateUrl: './divider.stories.html',
	imports: [ButtonComponent, DividerComponent, IconComponent],
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
