import { Meta, StoryFn } from '@storybook/angular';

interface EllipsisStory {}

export default {
	title: 'Documentation/Integration/Utilities/Ellipsis',
} as Meta;

function getTemplate(args: EllipsisStory): string {
	return `
<div>
	<div class="u-ellipsis">Bonbon fruitcake sweet lemon drops cupcake dessert. Shortbread chocolate cookie ice cream marshmallow. Macaroon sesame snaps carrot cake macaroon dessert. </div>
</div>
`;
}

const Template: StoryFn<EllipsisStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			gap: var(--pr-t-spacings-500);
			display: flex;
			flex-direction: column;

			> div {
				display: flex;
				gap: var(--pr-t-spacings-100);
				flex-wrap: wrap; 
				align-items: flex-start;

				> div { 	
					border: 1px solid var(--palettes-neutral-600);
					padding: var(--pr-t-spacings-100);
				}
			} 
		}
		`,
	],
});

export const Ellipsis = Template.bind({});
Ellipsis.args = {};
