import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Texts/Priority level/HTML&CSS/Sizes',
	render: () => ({
		template: `<div class="priorityLevel mod-low mod-S">
	<span class="priorityLevel-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-XXS"></span></span>
	<span class="priorityLevel-label">Low</span>
</div>
<div class="priorityLevel mod-low">
	<span class="priorityLevel-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-XS"></span></span>
	<span class="priorityLevel-label">Low</span>
</div>
<div class="priorityLevel mod-low mod-L">
	<span class="priorityLevel-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-S"></span></span>
	<span class="priorityLevel-label">Low</span>
</div>`,
	}),
} as Meta;

export const Sizes: StoryObj = {};
