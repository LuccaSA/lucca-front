import { Meta, Story } from '@storybook/angular';

interface FooterBasicStory {
	sticky: boolean;
}

export default {
	title: 'Documentation/Structure/Footer/Basic',
	argTypes: {
		sticky: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: FooterBasicStory): string {
	const sticky = args.sticky ? ` mod-sticky` : '';
	return `<section class="contentSection">
	<footer class="footer${sticky}">
		<div class="footer-content">Content</div>
		<div class="footer-actions">
			<button type="button" class="button">Button</button>
			<button type="button" class="button mod-outlined">Button</button>
			<button type="button" class="button mod-text">Button</button>
		</div>
	</footer>
</section>`;
}

const Template: Story<FooterBasicStory> = (args: FooterBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { sticky: false };
