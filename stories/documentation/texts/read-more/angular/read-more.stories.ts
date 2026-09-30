import { READ_MORE_SURFACE, ReadMoreComponent } from '@lucca-front/ng/read-more';
import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { generateInputs, setStoryOptions } from '@/helpers/stories';

const OTHER_SURFACE_OPTIONS = ['#0b1732'];

export default {
	title: 'Documentation/Texts/ReadMore/Angular/Basic',
	argTypes: {
		lineClamp: {
			control: {
				type: 'range',
				min: 2,
				max: 20,
				step: 1,
			},
			description: 'Modifie le nombre de lignes affichées à l’état replié.',
			table: { category: 'inputs' },
		},
		surface: {
			options: setStoryOptions([...READ_MORE_SURFACE, ...OTHER_SURFACE_OPTIONS]),
			control: {
				type: 'select',
			},
			description: 'Modifie la couleur de fond sous le bouton "Lire plus / moins" ',
			table: { category: 'inputs' },
		},
		textFlow: {
			description: 'Applique les espacements du composant Text flow',
			table: { category: 'inputs' },
		},
		openOnly: {
			description: 'Empêche la fermeture du composant en masquant le bouton "Lire moins"',
			table: { category: 'inputs' },
		},
		innerContent: {
			description: 'Permet de passer le contenu via un innerHTML',
			table: { category: 'inputs' },
		},
		content: {
			table: { disable: true },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [ReadMoreComponent],
		}),
	],
	render: ({ innerContent, content, ...args }, { argTypes }) => {
		const innerContentParam = innerContent ? ` [innerContent]="'${content.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')}'"` : ``;
		if (innerContent) {
			return {
				template: `<lu-read-more${innerContentParam}${generateInputs(args, argTypes)} />`,
			};
		} else {
			return {
				template: `<lu-read-more${innerContentParam}${generateInputs(args, argTypes)}>
	${content}
</lu-read-more>`,
			};
		}
	},
} as Meta;

export const Basic = {
	args: {
		lineClamp: 3,
		openOnly: false,
		surface: 'default',
		textFlow: false,
		innerContent: false,
		content: `<p>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos ut maiores ullam facere voluptatum odio eum? Debitis natus nulla fugit
		<a href="#">deleniti</a>
		esse ipsum sint voluptatibus! Debitis voluptates impedit blanditiis natus.
	</p>
	<p>
		Vitae veritatis non aliquam obcaecati illum voluptatum, voluptas dignissimos perspiciatis velit odit, magnam
		<a href="#">aspernatur</a>
		culpa totam nemo, magni cum? Magni sapiente voluptatibus temporibus. Quas reprehenderit deleniti sit veniam, molestias obcaecati.
	</p>`,
	},
};
