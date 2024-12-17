import { Meta, StoryFn } from '@storybook/angular';

interface NumericBadgeSizeStory {}

export default {
	title: 'Documentation/Texts/NumericBadge/HTML & CSS/Size',
	argTypes: {},
} as Meta;

function getTemplate(args: NumericBadgeSizeStory): string {
	return `<span class="numericBadge">7</span><span class="numericBadge mod-S">7</span><span class="numericBadge mod-XS">7</span>`;
}

const Template: StoryFn<NumericBadgeSizeStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`:host {
			display: flex;
			align-items: center;
			gap: var(--pr-t-spacings-50);
		}`,
	],
});

export const Size = Template.bind({});
Size.args = {};
