import { Meta } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Structure/Card2/HTML&CSS/Button Disabled',
	argTypes: {},
	render: () => {
		return {
			template: `<div class="card2">
	<h3 class="card2-heading"><button type="button" class="card2-heading-action" disabled>Title</button></h3>
	<div class="card2-content">Card content</div>
</div>`,
		};
	},
} as Meta;

export const Basic = {};
