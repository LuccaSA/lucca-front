import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Texts/Priority levels/HTML&CSS/Sizes',
	render: () => ({
		template: `<div class="priorityLevels mod-low mod-S">
	<span class="priorityLevels-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-XXS"></span></span>
	<span class="priorityLevels-label">Low</span>
</div>
<div class="priorityLevels mod-low">
	<span class="priorityLevels-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-XS"></span></span>
	<span class="priorityLevels-label">Low</span>
</div>
<div class="priorityLevels mod-low mod-L">
	<span class="priorityLevels-icon"><span aria-hidden="true" class="lucca-icon icon-priorityLevels mod-S"></span></span>
	<span class="priorityLevels-label">Low</span>
</div>`,
	}),
} as Meta;

export const Sizes: StoryObj = {};
