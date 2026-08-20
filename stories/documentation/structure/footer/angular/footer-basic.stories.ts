import { ButtonComponent } from '@lucca-front/ng/button';
import { FOOTER_CONTAINER_MAX, FOOTER_NARROW_AT_MEDIA_MAX, FooterComponent } from '@lucca-front/ng/footer';
import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { generateInputs, setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/Structure/Footer/Angular/Basic',
	argTypes: {
		narrowAtMediaMax: {
			options: setStoryOptions(FOOTER_NARROW_AT_MEDIA_MAX),
			control: {
				type: 'select',
			},
			description: 'Définit le breakpoint pour lequel le mode narrow (responsive) est appliqué.',
			table: { category: 'inputs' },
		},
		container: {
			description: 'Applique un container autour du contenu du footer.',
			table: { category: 'inputs' },
		},
		containerMax: {
			options: setStoryOptions(FOOTER_CONTAINER_MAX),
			control: {
				type: 'select',
			},
			if: { arg: 'container', truthy: true },
			description: 'Définit la largeur maximale du container.',
			table: { category: 'inputs' },
		},
		sticky: {
			description: 'Fige le footer lors du défilement vertical.',
			table: { category: 'inputs' },
		},
		forceNarrow: {
			description: 'Force le mode narrow (responsive) du footer.',
			table: { category: 'inputs' },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [FooterComponent, ButtonComponent],
		}),
	],
	render: (args, { argTypes }) => {
		const { narrowAtMediaMax, forceNarrow, ...otherArgs } = args;
		const narrow = forceNarrow ? `` : ` narrowAtMediaMax=${narrowAtMediaMax}`;
		const force = forceNarrow ? ` forceNarrow` : ``;

		return {
			template: `<lu-footer${narrow}${force}${generateInputs(otherArgs, argTypes)}>
	<ng-container footerContent>
		Content
	</ng-container>
	<button type="button" luButton>Button</button>
	<button type="button" luButton="outlined">Button</button>
</lu-footer>`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		sticky: false,
		container: false,
		containerMax: '',
		forceNarrow: false,
		narrowAtMediaMax: 'XXS',
	},
};
