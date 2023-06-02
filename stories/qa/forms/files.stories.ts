import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-files-stories',
	templateUrl: './files.stories.html'
}) class FilesStory {}

export default {
  title: 'QA/Forms/Files',
  component: FilesStory,
	decorators: [
		moduleMetadata({
			entryComponents: [FilesStory]
		})
	]
} as Meta;

const template: StoryFn<FilesStory> = () => ({});

export const basic = template.bind({});
