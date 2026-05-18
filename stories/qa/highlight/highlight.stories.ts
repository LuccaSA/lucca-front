import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HighlightComponent } from '@lucca-front/ng/highlight';

import { Meta, StoryObj } from '@storybook/angular';
import { PaletteAllArgType } from 'stories/helpers/common-arg-types';

@Component({
	selector: 'highlight-stories',
	templateUrl: './highlight.stories.html',
	imports: [HighlightComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HighlightStory {
	paletteOptions = PaletteAllArgType.options;
}

export default {
	title: 'QA/Highlight',
	component: HighlightStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<HighlightStory> = {
	args: {},
	render: template,
};
