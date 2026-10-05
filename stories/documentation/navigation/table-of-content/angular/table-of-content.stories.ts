import { cleanupTemplate } from '@/helpers/stories';

import { TableOfContentComponent, TableOfContentLinkDirective } from '@lucca-front/ng/table-of-content';
import { Meta, moduleMetadata } from '@storybook/angular-vite';

interface TableOfContentBasicStory {
	disabled: boolean;
}

export default {
	title: 'Documentation/Navigation/TableOfContent/Angular/Basic',
	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive le lien d’un des éléments.',
			table: { category: 'inputs' },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [TableOfContentComponent, TableOfContentLinkDirective],
		}),
	],
	render: (args: TableOfContentBasicStory) => {
		const disabled = args.disabled ? ` disabled` : '';
		return {
			template: cleanupTemplate(`<lu-table-of-content>
	<a *luTableOfContentLink class="is-active" href="#" (click)="$event.preventDefault()">Section 1</a>
	<a *luTableOfContentLink href="#" (click)="$event.preventDefault()"${disabled}>Section 2</a>
	<a *luTableOfContentLink href="#" (click)="$event.preventDefault()"${disabled}>Section 3</a>
	<a *luTableOfContentLink href="#" (click)="$event.preventDefault()"${disabled}>Section 4</a>
</lu-table-of-content>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		disabled: false,
	},
};
