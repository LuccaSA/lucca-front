import { Meta } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Structure/Card2/HTML&CSS/Wrapper',
	argTypes: {},
	render: () => {
		return {
			template: `<div class="card2Wrapper">
	<div class="card2Wrapper-list" role="list">
		<div class="card2" role="listitem">
			<h3 class="card2-heading"><a href="#" class="card2-heading-action">Title</a></h3>
			<div class="card2-content">Card content</div>
		</div>
		<div class="card2" role="listitem">
			<h3 class="card2-heading"><a href="#" class="card2-heading-action">Title</a></h3>
			<div class="card2-content">Card content</div>
		</div>
		<div class="card2" role="listitem">
			<h3 class="card2-heading"><a href="#" class="card2-heading-action">Title</a></h3>
			<div class="card2-content">Card content</div>
		</div>
	</div>
</div>`,
		};
	},
} as Meta;

export const Basic = {};
