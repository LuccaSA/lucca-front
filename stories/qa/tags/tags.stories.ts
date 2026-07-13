import { PaletteAllArgType } from '@/helpers/common-arg-types';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TagComponent } from '@lucca-front/ng/tag';
import { Meta, StoryObj } from '@storybook/angular-vite';

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
	decorators: [
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TagsStory> = {
	args: {},
	render: template,
};
