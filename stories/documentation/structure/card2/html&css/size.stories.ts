import { Meta } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Structure/Card2/HTML&CSS/Size',
	argTypes: {},
	render: () => {
		return {
			template: `<div class="card2 mod-S">
	<h3 class="card2-heading"><a href="#" class="card2-heading-action">Title</a></h3>
	<div class="card2-content">Card content</div>
</div>`,
		};
	},
} as Meta;

export const Basic = {};
