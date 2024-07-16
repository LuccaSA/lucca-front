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
		const paramIcon = args.icon === '' ? '' : 'icon="' + args.icon + '"';
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
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconBanknote.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconBanknoteAction.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconBanknoteActionError.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconBanknoteActionSuccess.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconBell.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconBulb.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconCalendar.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconCalendarAction.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconCalendarActionError.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconCalendarActionSuccess.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconChat.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconClock.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconClockAction.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconClockActionError.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconClockActionSuccess.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconCoffee.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconCreditCard.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconCreditCardAction.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconCreditCardActionError.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconCreditCardActionSuccess.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconFolder.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconGift.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconGraduate.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconIDCard.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconIDCardAction.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconIDCardActionError.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconIDCardActionSuccess.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconLock.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconLockAction.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconLockActionError.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconLockActionSuccess.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconMail.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconMailAction.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconMailActionError.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconMailActionSuccess.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconMegaphone.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconPaint.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconPaper.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconPaperAction.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconPaperActionError.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconPaperActionSuccess.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconParty.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconPicture.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconPictureAction.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconPictureActionError.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconPictureActionSuccess.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconPoc.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconRocket.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconSearch.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconTemperature.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconThumb.svg',
				'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconWarning.svg',
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
		icon: 'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconRocket.svg',
		heading: 'Empty state section',
		description: 'Description can be a string or a ng-template',
		center: false,
		palette: 'none',
		hx: 3,
	},
};
