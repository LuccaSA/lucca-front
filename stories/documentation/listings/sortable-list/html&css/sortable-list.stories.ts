import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface SortableListBasicStory {
	clickable: boolean;
	small: boolean;
}

export default {
	title: 'Documentation/Listings/Sortable List/HTML&CSS/Basic',
	decorators: [
		moduleMetadata({
			imports: [LuTooltipModule],
		}),
	],
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
	const clickable = args.clickable ? ` mod-clickable` : '';
	const small = args.small ? ` mod-S` : '';
	return `<ul class="sortableList${small}">
	<li class="sortableList-item cdk-drag-placeholder${clickable}">
		<span class="sortableList-item-handler button">
			<span class="lucca-icon icon-drag" aria-hidden="true"></span>
			<span class="pr-u-mask">Position 1. Utilisez les touches directionnelles pour réordonner</span>
		</span>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
			<span class="pr-u-mask">Delete</span>
		</button>
	</li>
	<li class="sortableList-item${clickable}">
		<span class="sortableList-item-handler button">
			<span class="lucca-icon icon-drag" aria-hidden="true"></span>
			<span class="pr-u-mask">Position 1. Utilisez les touches directionnelles pour réordonner</span>
		</span>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
			<span class="pr-u-mask">Delete</span>
		</button>
	</li>
	<li class="sortableList-item${clickable}">
		<span class="sortableList-item-handler button">
			<span class="lucca-icon icon-drag" aria-hidden="true"></span>
			<span class="pr-u-mask">Position 1. Utilisez les touches directionnelles pour réordonner</span>
		</span>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
			<span class="pr-u-mask">Delete</span>
		</button>
	</li>
</ul>

<li class="sortableList-item cdk-drag-preview${clickable}${small}" aria-hidden="true">
	<span class="sortableList-item-handler button">
		<span class="lucca-icon icon-drag" aria-hidden="true"></span>
		<span class="pr-u-mask">Position 1. Utilisez les touches directionnelles pour réordonner</span>
	</span>
	<div class="sortableList-item-content">
		<p class="sortableList-item-content-description">Label</p>
		<p class="sortableList-item-content-helper">Helper message</p>
	</div>
	<button class="clear sortableList-clear" type="button">
		<span class="pr-u-mask">Delete</span>
	</button>
</li>

`;
}

const Template = (args: SortableListBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`:host > .sortableList-item { margin-block-start: var(--pr-t-spacings-200) }`],
});

export const Basic: StoryObj<SortableListBasicStory> = {
	args: { clickable: false, small: false },
	render: Template,
};
