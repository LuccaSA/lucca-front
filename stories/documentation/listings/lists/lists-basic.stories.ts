import { Meta, Story } from '@storybook/angular';

interface ListBasicStory {
	clickable: boolean;
}

export default {
	title: 'Documentation/Listings/List/Basic',
	argTypes: {
		clickable: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: ListBasicStory): string {
	const clickable = args.clickable ? `mod-clickable` : '';
	return `
	<ul class="list">
		<li class="list-item ${clickable}">
			<div class="list-item-content">
				<h3 class="list-item-content-title">Titre</h3>
				<p class="list-item-content-description">Description</p>
			</div>
			<div class="list-item-actions">
				<button class="actionIcon"><span aria-hidden="true" class="lucca-icon icon-edit"></span></button>
				<button class="actionIcon"><span aria-hidden="true" class="lucca-icon icon-trash"></span></button>
			</div>
		</li>
		<li class="list-item ${clickable}">
			<div class="list-item-content">
				<h3 class="list-item-content-title">Titre</h3>
				<p class="list-item-content-description">Description</p>
			</div>
			<div class="list-item-actions">
				<button class="actionIcon"><span aria-hidden="true" class="lucca-icon icon-edit"></span></button>
				<button class="actionIcon"><span aria-hidden="true" class="lucca-icon icon-trash"></span></button>
			</div>
		</li>
	</ul>
	`
}

const Template: Story<ListBasicStory> = (args: ListBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { clickable: false };
