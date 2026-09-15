import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { cleanupTemplate } from '@/helpers/stories';

interface SampleBasicStory {
	content: string;
	changed?: (value: string) => void;
}

export default {
	title: 'Documentation/Sample/Angular/Basic',
	// Chaque arg est rangé dans une `table.category` : `inputs` pour un `input()`, `outputs` pour un `output()`,
	// `models` pour un `model()`. Un output est en plus exposé comme action loggée (`action`, `control: false`)
	// et documente le type émis via `table.type.summary` (`void` si l'`output()` n'a pas de type, sinon `T`).
	argTypes: {
		content: {
			control: {
				type: 'text',
			},
			table: { category: 'inputs' },
		},
		changed: {
			description: 'Événement déclenché lorsque le contenu change.',
			action: 'changed',
			control: false,
			table: { category: 'outputs', type: { summary: 'string' } },
		},
	},
	decorators: [
		moduleMetadata({
			// imports: [SampleComponent],
		}),
	],
	render: (args: SampleBasicStory) => {
		return {
			props: {
				...args,
			},
			template: cleanupTemplate(`<luSample (changed)="changed($event)">
	${args.content}
</luSample>`),
		};
	},
} as Meta;

export const Basic = { args: { content: 'Sample' } };
