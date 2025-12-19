import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeComponent } from '@lucca-front/ng/code';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'code-stories',
	templateUrl: './code.stories.html',
	imports: [CodeComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class CodeStory {}

export default {
	title: 'QA/Code',
	component: CodeStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<CodeStory> = {
  args: {},
  render: template,
}
