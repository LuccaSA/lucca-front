import { Component } from '@angular/core';
import { TagComponent } from '@lucca-front/ng/tag';
import { Meta, StoryFn } from '@storybook/angular';
import { PaletteAllArgType } from 'stories/helpers/common-arg-types';

@Component({
	selector: 'tags-stories',
	templateUrl: './tags.stories.html',
	imports: [TagComponent],
})
class TagsStory {
	paletteOptions = PaletteAllArgType.options;
}

export default {
	title: 'QA/Tags',
	component: TagsStory,
} as Meta;

const template: StoryFn<TagsStory> = () => ({});

export const basic = template.bind({});
