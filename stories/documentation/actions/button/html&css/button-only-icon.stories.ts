import { Meta, StoryFn } from '@storybook/angular';

interface ButtonIconStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Only icon',
} as Meta;

function getTemplate(args: ButtonIconStory): string {
	return `<button type="button" class="button mod-outlined mod-onlyIcon"><span aria-hidden="true" class="lucca-icon icon-heart"></span></button>
<button type="button" class="button mod-text mod-onlyIcon"><span aria-hidden="true" class="lucca-icon icon-heart"></span></button>
<button type="button" class="button mod-outlined mod-onlyIcon mod-delete"><span aria-hidden="true" class="lucca-icon icon-trashDelete"></span></button>
<button type="button" class="button mod-text mod-onlyIcon mod-delete"><span aria-hidden="true" class="lucca-icon icon-trashDelete"></span></button>`;
}

const Template: StoryFn<ButtonIconStory> = (args: ButtonIconStory) => ({
	props: args,
	template: getTemplate(args),
});

export const IconButton = Template.bind({});
IconButton.args = {};
