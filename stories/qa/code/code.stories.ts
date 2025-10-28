import { Component } from '@angular/core';
import { codeComponent } from '@lucca-front/ng/code';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'code-stories',
	templateUrl: './code.stories.html',
	imports: [codeComponent],
})
class CodeStory {}

export default {
	title: 'QA/Code',
	component: CodeStory,
} as Meta;

const template: StoryFn<CodeStory> = () => ({});

export const Basic = template.bind({});
