import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ColorComponent } from '@lucca-front/ng/color';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'color-stories',
	templateUrl: './color.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ColorComponent],
})
class ColorStory {}

export default {
	title: 'QA/Color',
	component: ColorStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<ColorStory> = {
	args: {},
	render: template,
};
