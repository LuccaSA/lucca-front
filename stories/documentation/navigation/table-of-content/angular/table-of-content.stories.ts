import { TableOfContentComponent, TableOfContentLinkDirective } from '@lucca-front/ng/table-of-content';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

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
	<a *luTableOfContentLink class="is-active" href="#">Section 1</a>
	<a *luTableOfContentLink href="#"${disabled}>Section 2</a>
	<a *luTableOfContentLink href="#"${disabled}>Section 3</a>
	<a *luTableOfContentLink href="#"${disabled}>Section 4</a>
</lu-table-of-content>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		disabled: false,
	},
};
