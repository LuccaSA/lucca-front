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
	render: (args: EmptyStateSectionComponent) => {
		const { heading, description, center, palette, hx, icon } = args;
		const paramIcon = args.icon === '' ? '' : 'icon="https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/' + args.icon + '.svg"';
		return {
			template: `<lu-empty-state-section hx="${hx}" ${paramIcon} heading="${heading}" description="${description}" palette="${palette}" ${center ? ' center' : ''}>
	<button luButton type="button" palette="product">Button</button>
	<button luButton="outlined" type="button" palette="product">Button</button>
</lu-empty-state-section>`,
		};
	},
	argTypes: {
		palette: PaletteArgType,
		hx: {
			control: {
				type: 'number',
				min: 1,
				max: 6,
			},
			description: '[v18.1]',
		},
		icon: {
			options: [
				'iconBanknote',
				'iconBanknoteAction',
				'iconBanknoteActionError',
				'iconBanknoteActionSuccess',
				'iconBell',
				'iconBulb',
				'iconCalendar',
				'iconCalendarAction',
				'iconCalendarActionError',
				'iconCalendarActionSuccess',
				'iconChat',
				'iconClock',
				'iconClockAction',
				'iconClockActionError',
				'iconClockActionSuccess',
				'iconCoffee',
				'iconCreditCard',
				'iconCreditCardAction',
				'iconCreditCardActionError',
				'iconCreditCardActionSuccess',
				'iconFolder',
				'iconGift',
				'iconGraduate',
				'iconIDCard',
				'iconIDCardAction',
				'iconIDCardActionError',
				'iconIDCardActionSuccess',
				'iconLock',
				'iconLockAction',
				'iconLockActionError',
				'iconLockActionSuccess',
				'iconMail',
				'iconMailAction',
				'iconMailActionError',
				'iconMailActionSuccess',
				'iconMegaphone',
				'iconPaint',
				'iconPaper',
				'iconPaperAction',
				'iconPaperActionError',
				'iconPaperActionSuccess',
				'iconParty',
				'iconPicture',
				'iconPictureAction',
				'iconPictureActionError',
				'iconPictureActionSuccess',
				'iconPoc',
				'iconRocket',
				'iconSearch',
				'iconTemperature',
				'iconThumb',
				'iconWarning',
			],
			control: 'select',
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
		icon: 'iconRocket',
		heading: 'Empty state section',
		description: 'Description can be a string or a ng-template',
		center: false,
		palette: 'none',
		hx: 3,
	},
};
