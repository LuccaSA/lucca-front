import { luReadMoreTranslations, READ_MORE_SURFACE, ReadMoreComponent } from '@lucca-front/ng/read-more';
import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { generateInputs, intlArgType, setStoryOptions } from '@/helpers/stories';

const OTHER_SURFACE_OPTIONS = ['#0b1732'];

export default {
	title: 'Documentation/Texts/ReadMore/Angular/Basic',
	component: ReadMoreComponent,
	argTypes: {
		lineClamp: {
			control: {
				type: 'range',
				min: 2,
				max: 20,
				step: 1,
			},
			description: 'Modifie le nombre de lignes affichées à l’état replié.',
			table: { category: 'inputs', defaultValue: { summary: '5' } },
		},
		surface: {
			options: setStoryOptions([...READ_MORE_SURFACE, ...OTHER_SURFACE_OPTIONS]),
			control: {
				type: 'select',
			},
			description: 'Modifie la couleur de fond sous le bouton "Lire plus / moins" ',
			table: { category: 'inputs', defaultValue: { summary: 'null' } },
		},
		textFlow: {
			description: 'Applique les espacements du composant Text flow',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		openOnly: {
			description: 'Empêche la fermeture du composant en masquant le bouton "Lire moins"',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		plainText: {
			description: 'Affiche les retours à la ligne (`\\n`) du contenu au lieu de les fusionner en espaces. Destiné à du texte brut, comme la valeur d’un textarea.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		innerContent: {
			description: 'Passe le contenu de l’exemple via l’input `innerContent` (`string | null`, injecté en innerHTML) au lieu de le projeter dans le composant.',
			table: { category: 'story' },
		},
		content: {
			table: { disable: true },
		},
		intl: intlArgType(luReadMoreTranslations, 'ReadMoreTranslate'),
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
		plainText: false,
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
