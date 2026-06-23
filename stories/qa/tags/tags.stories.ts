import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TagComponent } from '@lucca-front/ng/tag';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { PaletteAllArgType } from '@/helpers/common-arg-types';

@Component({
	selector: 'tags-stories',
	templateUrl: './tags.stories.html',
	imports: [TagComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TagsStory {
	paletteOptions = PaletteAllArgType.options;
}

export default {
	title: 'QA/Tags',
	component: TagsStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TagsStory> = {
	args: {},
	render: template,
};
