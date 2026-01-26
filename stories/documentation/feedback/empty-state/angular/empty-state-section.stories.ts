import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { PaletteArgType } from '../../../../helpers/common-arg-types';

export default {
	title: 'Documentation/Feedback/Empty State/Angular/Section',
	component: EmptyStateSectionComponent,
	decorators: [
		moduleMetadata({
			imports: [EmptyStateSectionComponent, ButtonComponent, HttpClientModule],
		}),
	],
	render: (args) => {
		const { heading, description, center, palette, hx, illustration, action } = args;
		const paletteArg = palette !== 'none' ? ` palette="${palette}"` : ``;
		const actionArg = action ? ` action` : ``;
		return {
			template: `<lu-empty-state-section illustration="${illustration}" hx="${hx}" heading="${heading}" description="${description}"${actionArg}${paletteArg}${center ? ' center' : ''}>
	<button luButton type="button" palette="product">Button</button>
	<button luButton="outlined" type="button">Button</button>
</lu-empty-state-section>`,
		};
	},
	argTypes: {
		palette: PaletteArgType,
		illustration: {
			options: [
				'absence',
				'anniversary',
				'awardRibbon',
				'banknote',
				'battery',
				'bell',
				'binders',
				'biscuit',
				'bookmark',
				'books',
				'bronzeMedal',
				'building',
				'bulb',
				'calculator',
				'calendar',
				'camera',
				'charts',
				'chat',
				'checkmark',
				'chemistry',
				'clipboard',
				'clock',
				'coffee',
				'cup',
				'diamond',
				'equity',
				'error',
				'export',
				'file',
				'fish',
				'folder',
				'gear',
				'gift',
				'goldMedal',
				'graduate',
				'growth',
				'hearth',
				'home',
				'hourglass',
				'import',
				'invoice',
				'jigsaw',
				'link',
				'lock',
				'magnifyingGlass',
				'mail',
				'map',
				'mapPin',
				'medical',
				'megaphone',
				'mix',
				'mobile',
				'multipleReceipts',
				'newbie',
				'newsFeed',
				'office',
				'outside',
				'paint',
				'paperplane',
				'party',
				'paymentCards',
				'payslip',
				'pen',
				'percent',
				'phone',
				'picture',
				'polaroid',
				'receipt',
				'recruit',
				'reload',
				'restaurant',
				'rocket',
				'save',
				'screwdriver',
				'security',
				'silverMedal',
				'sliders',
				'speed',
				'stopwatch',
				'subjects',
				'survey',
				'target',
				'tasklist',
				'temperature',
				'thumbtack',
				'thumbUp',
				'timer',
				'trash',
				'userID',
				'video',
				'warning',
				'widget',
			],
			control: {
				type: 'select',
			},
		},
		hx: {
			control: {
				type: 'number',
				min: 1,
				max: 6,
			},
			description: '[v18.1]',
		},
		heading: {
			description: '[v18.1] Optional',
		},
		description: {
			description: '[v18.1] Optional',
		},
	},
} as Meta;

export const Section: StoryObj<EmptyStateSectionComponent> = {
	args: {
		illustration: 'rocket',
		action: false,
		heading: 'Empty state section',
		description: 'Description can be a string or a ng-template',
		center: false,
		palette: 'none',
		hx: 3,
	},
};
