import { Meta, StoryObj } from '@storybook/angular';

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PaginationComponent } from '@lucca-front/ng/pagination';

@Component({
	selector: 'lu-intl-story',
	imports: [PaginationComponent],
	template: ` <lu-pagination [from]="0" [to]="10" [itemsCount]="1000" [intl]="{ results: resultIntl() }" /> `,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntlStory {
	resultIntl = input('Dépenses de {{from}} à {{to}} sur {{itemsCount}}');
}

export default {
	title: 'Documentation/Intl/Basic',
	component: IntlStory,
} as Meta;

export const Basic: StoryObj<IntlStory> = {
	parameters: {
		controls: {
			include: ['resultIntl'],
		},
		docs: {
			source: {
				language: 'ts',
				type: 'code',
				code: `<lu-pagination [from]="0" [to]="10" [itemsCount]="1000" [intl]="{ results: resultIntl }" />`,
			},
		},
	},
	argTypes: {
		resultIntl: {
			control: 'text',
		},
	},
};
