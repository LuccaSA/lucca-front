import { Meta, StoryFn } from '@storybook/angular';

interface EllipsisStory {}

export default {
	title: 'Documentation/Integration/Utilities/Ellipsis',
} as Meta;

function getTemplate(args: EllipsisStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="u-ellipsis demo-utility">Bonbon fruitcake sweet lemon drops cupcake dessert. Shortbread chocolate cookie ice cream marshmallow. Macaroon sesame snaps carrot cake macaroon dessert. </div>
</div>`;
}

const Template: StoryFn<EllipsisStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Ellipsis = Template.bind({});
Ellipsis.args = {};
