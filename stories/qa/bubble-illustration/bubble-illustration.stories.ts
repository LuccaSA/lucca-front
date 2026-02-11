import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BubbleIllustrationComponent, BubbleIllustrationList } from '@lucca-front/ng/bubble-illustration';
import { Meta, StoryObj } from '@storybook/angular';
import { PaletteAllArgType } from 'stories/helpers/common-arg-types';

@Component({
	selector: 'bubble-illustration-stories',
	templateUrl: './bubble-illustration.stories.html',
	imports: [BubbleIllustrationComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class BubbleIllustrationStory {
	paletteOptions = PaletteAllArgType.options;
	bubbleIllustrationsList = BubbleIllustrationList;
}

export default {
	title: 'QA/BubbleIllustration',
	component: BubbleIllustrationStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<BubbleIllustrationStory> = {
	args: {},
	render: template,
};
