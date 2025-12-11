import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'forms-files-stories',
	templateUrl: './files.stories.html',
})
class FilesStory {}

export default {
	title: 'QA/Forms/Files',
	component: FilesStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<FilesStory> = {
	args: {},
	render: template,
};
