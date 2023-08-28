import { Meta, Story } from '@storybook/angular';

interface SortableListBasicStory {
	clickable: boolean;
	small: boolean;
}

export default {
	title: 'Documentation/Listings/Sortable List/Basic',
	argTypes: {
		clickable: {
			control: {
				type: 'boolean',
			},
		},
		small: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: SortableListBasicStory): string {
	const clickable = args.clickable ? `mod-clickable` : '';
	const small = args.small ? `mod-S` : '';
	return `<ul class="sortableList ${small}">
	<li class="sortableList-item ${clickable}">
		<div class="sortableList-item-handler"></div>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
		  <span aria-hidden="true" class="lucca-icon icon-close"></span>
			<span class="u-mask">Delete</span>
		</button>
	</li>
	<li class="sortableList-item ${clickable}">
		<div class="sortableList-item-handler"></div>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
		  <span aria-hidden="true" class="lucca-icon icon-close"></span>
			<span class="u-mask">Delete</span>
		</button>
	</li>
	<li class="sortableList-item ${clickable}">
		<div class="sortableList-item-handler"></div>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
		  <span aria-hidden="true" class="lucca-icon icon-close"></span>
			<span class="u-mask">Delete</span>
		</button>
	</li>
</ul>`;
}

const Template: Story<SortableListBasicStory> = (args: SortableListBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { clickable: false, small: false };
