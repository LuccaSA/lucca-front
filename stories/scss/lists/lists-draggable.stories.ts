import { Meta, Story } from '@storybook/angular';

interface ListDraggableStory {
}

export default {
	title: 'SCSS/List/Draggable',
	argTypes: {
	},
} as Meta;

function getTemplate(args: ListDraggableStory): string {
	const classes = [].filter(Boolean).join(' ');
	return `
	<ul class="list">
		<li class="list-item mod-draggable">
			<div class="list-item-handler"></div>
			<div class="list-item-content">
				<h3 class="list-item-content-title">Titre</h3>
				<p class="list-item-content-description">Description</p>
			</div>
		</li>
		<li class="list-item mod-draggable">
			<div class="list-item-handler"></div>
			<div class="list-item-content">
				<h3 class="list-item-content-title">Titre</h3>
				<p class="list-item-content-description">Description</p>
			</div>
		</li>
	</ul>
	`
}

const Template: Story<ListDraggableStory> = (args: ListDraggableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Draggable = Template.bind({});
Draggable.args = {};
