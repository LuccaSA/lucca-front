import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { IconsList } from 'packages/icons/icons-list';
import { HiddenArgType, PaletteAllArgType } from 'stories/helpers/common-arg-types';
import { generateInputs } from 'stories/helpers/stories';

interface ListingBasicStory {
	checklist: boolean;
	ordered: boolean;
	descriptionList: boolean;
	icons: boolean;
	type: string;
	palette: string;
	defaultIcon: string;
	icon: string;
	action: string | null;
}

export default {
	title: 'Documentation/Listings/Listing/Angular/Inline',
	component: ListingComponent,

	decorators: [
		moduleMetadata({
			imports: [ListingComponent, ListingItemComponent, IconComponent, ButtonComponent],
		}),
	],

	render: (args: ListingBasicStory, context) => {
		const { type, checklist, ordered, descriptionList, icons, defaultIcon, icon, action, ...inputs } = args;
		const checklistParam = args.type === 'checklist' ? ` checklist` : ``;
		const orderedParam = args.type === 'ordered' ? ` ordered` : ``;
		const descriptionListParam = args.type === 'descriptionList' ? ` descriptionList` : ``;
		const iconsParam = args.type === 'icons' ? ` icons` : ``;
		const iconParam = args.type === 'icons' ? ` icon="${args.icon}"` : ``;
		const defaultIconParam = args.type === 'icons' ? ` defaultIcon="${defaultIcon}"` : ``;
		let actionContainer = '';
		if (action === 'button') {
			actionContainer = '<ng-container action><button luButton="outlined" type="button">Action</button></ng-container>';
		} else if (action === 'link') {
			actionContainer = '<ng-container action><a luLink>Link</a></ng-container>';
		}
		if (args.type === 'descriptionList') {
			return {
				template: `<lu-listing inline${descriptionListParam}${generateInputs(inputs, context.argTypes)}>
				<lu-listing-item>
					<dt>Term:</dt>
					<dd>definition</dd>
				</lu-listing-item>
				<lu-listing-item>
					<dt>Term,</dt>
					<dt>term:</dt>
					<dd>definition</dd>
				</lu-listing-item>
				<div lu-listing-item>
					<dt><lu-icon icon="user" size="S" alt="term"/></dt>
					<dd><a href="#">lien</a></dd>
				</div>
				<div lu-listing-item>
					<dt>Term:</dt>
					<dd>definition,</dd>
					<dd>definition</dd>
				</div>
				<div lu-listing-item>
					<dt>Term:</dt>
					<dd>definition</dd>
				</div>
				${actionContainer}
			</lu-listing>
	`,
			};
		} else {
			return {
				template: `<lu-listing inline${checklistParam}${orderedParam}${iconsParam}${iconsParam}${defaultIconParam}${generateInputs(inputs, context.argTypes)}>
	<lu-listing-item><a href="#">lorem ipsum dolor sit amet</a></lu-listing-item>
	<lu-listing-item${iconParam}><a href="#">lorem ipsum dolor sit amet</a></lu-listing-item>
	<lu-listing-item><a href="#">lorem ipsum dolor sit amet</a></lu-listing-item>
	<lu-listing-item><a href="#">lorem ipsum dolor sit amet</a></lu-listing-item>
	<lu-listing-item><a href="#">lorem ipsum dolor sit amet</a></lu-listing-item>
</lu-listing>`,
			};
		}
	},
} as Meta;

export const Template: StoryObj<ListingComponent & ListingItemComponent & { type: string }> = {
	argTypes: {
		type: {
			options: ['', 'checklist', 'icons', 'descriptionList'],
			control: {
				type: 'select',
			},
		},

		checklist: HiddenArgType,
		icons: HiddenArgType,
		ordered: HiddenArgType,
		palette: PaletteAllArgType,
		defaultIcon: {
			options: IconsList.map((i) => i.icon),
			control: {
				type: 'select',
			},
		},
		icon: {
			if: { arg: 'type', eq: 'icons' },
			options: IconsList.map((i) => i.icon),
			control: {
				type: 'select',
			},
		},
		action: {
			options: [null, 'button', 'link'],
			control: {
				type: 'select',
			},
		},
	},

	args: {
		type: '',
		divider: false,
		defaultIcon: 'book',
		icon: 'foodCroissant',
		palette: 'none',
		action: null,
	},
};
