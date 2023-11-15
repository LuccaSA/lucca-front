import { Meta, StoryFn } from '@storybook/angular';

interface CheckboxIncompleteStory {}

export default {
	title: 'Documentation/Forms/Checkbox Legacy/Incomplete',
	argTypes: {},
} as Meta;

function getTemplate(args: CheckboxIncompleteStory): string {
	return `
		<label class="checkbox">
			<input class="checkbox-input is-incomplete" type="checkbox" checked="checked" aria-checked="mixed" />
			<span class="checkbox-label">Checkbox</span>
		</label>
		<ul class="u-listReset u-marginLeftM">
			<li>
				<label class="checkbox">
					<input class="checkbox-input" type="checkbox" checked="checked" />
					<span class="checkbox-label">Checkbox</span>
				</label>
			</li>
			<li>
				<label class="checkbox">
					<input class="checkbox-input" type="checkbox" />
					<span class="checkbox-label">Checkbox</span>
				</label>
			</li>
		</ul>
	`;
}

const Template: StoryFn<CheckboxIncompleteStory> = (args: CheckboxIncompleteStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Incomplete = Template.bind({});
Incomplete.args = {};
