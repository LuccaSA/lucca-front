import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Texts/Priority levels/HTML&CSS/Basic',
	render: () => ({
		template: `<div class="priorityLevels mod-low">
	<span class="priorityLevels-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-XS"></span></span>
	<span class="priorityLevels-label">Low</span>
</div>
<div class="priorityLevels mod-medium">
	<span class="priorityLevels-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-XS"></span></span>
	<span class="priorityLevels-label">Medium</span>
</div>
<div class="priorityLevels mod-high">
	<span class="priorityLevels-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-XS"></span></span>
	<span class="priorityLevels-label">High</span>
</div>`,
	}),
} as Meta;

export const Basic: StoryObj = {};
