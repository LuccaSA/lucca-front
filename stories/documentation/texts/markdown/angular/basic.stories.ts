import { MarkdownComponent } from '@lucca-front/ng/markdown';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, within } from 'storybook/test';

interface MarkdownBasicStory {
	content: string;
	headingLevel: number;
}

const defaultContent = `# Titre principal

Un paragraphe avec du **gras**, de l'*italique*, du \`code\` et un [lien](https://prisme.lucca.io).

## Sous-titre

- premier élément
- deuxième élément

### Sous-sous-titre

1. première étape
2. deuxième étape
`;

export default {
	title: 'Documentation/Texts/Markdown/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [MarkdownComponent],
		}),
	],
	argTypes: {
		content: {
			control: {
				type: 'text',
			},
			description: 'Source markdown à afficher.',
			table: { category: 'inputs' },
		},
		headingLevel: {
			control: {
				type: 'number',
				min: 1,
				max: 6,
			},
			description: 'Niveau sémantique du titre de premier niveau (`# Titre`), les suivants étant imbriqués à partir de celui-ci.',
			table: { category: 'inputs' },
		},
	},
} as Meta;

export const Basic: StoryObj<MarkdownBasicStory> = {
	args: {
		content: defaultContent,
		headingLevel: 1,
	},
	render: (args) => ({
		props: args,
		template: `<lu-markdown [content]="content" [headingLevel]="headingLevel" />`,
	}),
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie que les titres sont rendus avec leur classe utilitaire', async () => {
		await expect(canvas.getByRole('heading', { level: 1, name: 'Titre principal' })).toHaveClass('pr-u-h1');
		await expect(canvas.getByRole('heading', { level: 2, name: 'Sous-titre' })).toHaveClass('pr-u-h2');
	});

	await step('Vérifie que le contenu inline est rendu', async () => {
		await expect(canvas.getByRole('link', { name: 'lien' })).toHaveAttribute('href', 'https://prisme.lucca.io');
		await expect(canvas.getAllByRole('listitem').length).toBeGreaterThan(0);
	});
});
