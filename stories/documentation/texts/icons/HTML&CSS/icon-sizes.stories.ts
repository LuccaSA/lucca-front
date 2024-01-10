import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/Icons/HTML&CSS',
	render: () => {
		return {
			template: `<span aria-hidden="true" class="lucca-icon icon-heart mod-XXS"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-XS"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-S"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-M"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-L"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-XL"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-XXL"></span>`
		}
	}
} as Meta;

export const Size: StoryObj = {};
