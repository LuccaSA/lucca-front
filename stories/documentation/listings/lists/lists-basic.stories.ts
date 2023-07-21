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
			},
		},
	},
} as Meta;

function getTemplate(args: ListBasicStory): string {
	const clickable = args.clickable ? `mod-clickable` : '';
	return `
	<ul class="list">
		<li class="list-item mod-draggable">
			<div class="list-item-handler"></div>
			<div class="list-item-content">
				<p class="list-item-content-description">Label</p>
				<p class="list-item-content-helper">Helper message</p>
			</div>
			<button class="clear list-clear" type="button">
			  <span aria-hidden="true" class="lucca-icon icon-mathsMultiplicate"></span>
			</button>
		</li>
		<li class="list-item mod-draggable">
			<div class="list-item-handler"></div>
			<div class="list-item-content">
				<p class="list-item-content-description">Label</p>
				<p class="list-item-content-helper">Helper message</p>
			</div>
			<button class="clear list-clear" type="button">
			  <span aria-hidden="true" class="lucca-icon icon-mathsMultiplicate"></span>
			</button>
		</li>
		<li class="list-item mod-draggable">
			<div class="list-item-handler"></div>
			<div class="list-item-content">
				<p class="list-item-content-description">Label</p>
				<p class="list-item-content-helper">Helper message</p>
			</div>
			<button class="clear list-clear" type="button">
			  <span aria-hidden="true" class="lucca-icon icon-mathsMultiplicate"></span>
			</button>
		</li>
	</ul>
	`;
}

const Template: Story<ListBasicStory> = (args: ListBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { clickable: false };
