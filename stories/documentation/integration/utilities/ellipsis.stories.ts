import { Meta, Story } from '@storybook/angular';

interface EllipsisStory {}

export default {
	title: 'Documentation/Integration/Utilities/Ellipsis',
} as Meta;

function getTemplate(args: EllipsisStory): string {
	return `
		<div class="u-ellipsis" style="width: 20rem">Bonbon fruitcake sweet lemon drops cupcake dessert. Shortbread chocolate cookie ice cream marshmallow. Macaroon sesame snaps carrot cake macaroon dessert. </div>
	`;
}

const Template: Story<EllipsisStory> = (args: EllipsisStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		span {
			padding-right: var(--spacings-small);
		}
		}`,
	],
});

export const Ellipsis = Template.bind({});
Ellipsis.args = {};
