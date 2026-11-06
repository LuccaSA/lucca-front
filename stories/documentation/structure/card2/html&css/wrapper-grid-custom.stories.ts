import { Meta } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Structure/Card2/HTML&CSS/Wrapper Grid Custom',
	argTypes: {},
	render: () => {
		return {
			template: `<div class="card2Wrapper mod-gridCustom">
	<div class="card2Wrapper-list" role="list">
		<div class="grid" style="--grid-columns: 3">
			<div class="grid-column" style="--grid-colspan: 2">
				<div class="card2" role="listitem">
					<h3 class="card2-heading"><a href="#" class="card2-heading-action">Title</a></h3>
					<div class="card2-content">Card content</div>
				</div>
			</div>
			<div class="grid-column">
				<div class="card2" role="listitem">
					<h3 class="card2-heading"><a href="#" class="card2-heading-action">Title</a></h3>
					<div class="card2-content">Card content</div>
				</div>
			</div>
			<div class="grid-column">
				<div class="card2" role="listitem">
					<h3 class="card2-heading"><a href="#" class="card2-heading-action">Title</a></h3>
					<div class="card2-content">Card content</div>
				</div>
			</div>
		</div>
	</div>
</div>`,
		};
	},
} as Meta;

export const Basic = {};
