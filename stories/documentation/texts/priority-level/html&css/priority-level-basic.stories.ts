import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Texts/Priority level/HTML&CSS/Basic',
	render: () => ({
		template: `<div class="priorityLevel mod-low">
	<span class="priorityLevel-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-XS"></span></span>
	<span class="priorityLevel-label">Low</span>
</div>
<div class="priorityLevel mod-medium">
	<span class="priorityLevel-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-XS"></span></span>
	<span class="priorityLevel-label">Medium</span>
</div>
<div class="priorityLevel mod-high">
	<span class="priorityLevel-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-XS"></span></span>
	<span class="priorityLevel-label">High</span>
</div>`,
	}),
} as Meta;

export const Basic: StoryObj = {};
