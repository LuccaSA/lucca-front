import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HighlightComponent } from '@lucca-front/ng/highlight-text';

import { Meta, StoryObj } from '@storybook/angular';
import { PaletteAllArgType } from 'stories/helpers/common-arg-types';

@Component({
	selector: 'highlight-stories',
	templateUrl: './highlight-text.stories.html',
	imports: [HighlightComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HighlightTextStory {
	paletteOptions = PaletteAllArgType.options;
}

export default {
	title: 'QA/HighlightText',
	component: HighlightTextStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<HighlightTextStory> = {
	args: {},
	render: template,
};
