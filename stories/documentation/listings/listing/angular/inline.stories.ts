import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { TagComponent } from '@lucca-front/ng/tag';
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
	action: string;
	value: string;
	heading: string;
}

export default {
	title: 'Documentation/Listings/Listing/Angular/Inline',
	component: ListingComponent,

	decorators: [
		moduleMetadata({
			imports: [ListingComponent, ListingItemComponent, IconComponent, ButtonComponent, TagComponent],
		}),
	],

	render: (args: ListingBasicStory, context) => {
		const { type, checklist, ordered, descriptionList, icons, defaultIcon, icon, action, value, heading, ...inputs } = args;
		const checklistParam = args.type === 'checklist' ? ` checklist` : ``;
		const orderedParam = args.type === 'ordered' ? ` ordered` : ``;
		const descriptionListParam = args.type === 'descriptionList' ? ` descriptionList` : ``;
		const iconsParam = args.type === 'icons' ? ` icons` : ``;
		const iconParam = args.type === 'icons' ? ` icon="${args.icon}"` : ``;
		const defaultIconParam = args.type === 'icons' ? ` defaultIcon="${defaultIcon}"` : ``;
		let actionContent = '';
		if (action === 'button') {
			actionContent = '<button luButton="outlined" type="button">Action</button>';
		} else if (action === 'link') {
			actionContent = '<a href="#">Link</a>';
		}
		if (args.type === 'descriptionList') {
			return {
				template: `<lu-listing inline${descriptionListParam}${generateInputs(inputs, context.argTypes)}>
	<lu-listing-item${generateInputs(inputs, context.argTypes)} [heading]="heading" [value]="value">
	<ng-template #heading>Je passe par un template</ng-template>
	<ng-template #value><lu-tag label="Moi aussi"/></ng-template>
	</lu-listing-item>
	<lu-listing-item${generateInputs(inputs, context.argTypes)} [heading]="headingWithIcon" value="${value}">
	<ng-template #headingWithIcon><lu-icon size="S" icon="user"/></ng-template></lu-listing-item>
	<lu-listing-item${generateInputs(inputs, context.argTypes)} heading="${heading}" value="${value}"></lu-listing-item>
	<lu-listing-item${generateInputs(inputs, context.argTypes)} heading="${heading}" value="${value}"></lu-listing-item>
<ng-container actionsContent>
	${actionContent}</ng-container>
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

export const Template: StoryObj<ListingComponent & ListingItemComponent & { type: string } & { action: string }> = {
	argTypes: {
		heading: {
			type: 'string',
		},
		value: {
			type: 'string',
		},
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
		heading: 'Title:',
		value: 'content',
	},
};
