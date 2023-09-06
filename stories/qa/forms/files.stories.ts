import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-files-stories',
	templateUrl: './files.stories.html',
})
class FilesStory {}

export default {
	title: 'QA/Forms/Files',
	component: FilesStory,
} as Meta;

const template: StoryFn<FilesStory> = () => ({});

export const basic = template.bind({});
