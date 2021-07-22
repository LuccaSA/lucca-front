import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
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

const template: Story<FilesStory> = () => ({});

export const basic = template.bind({});
