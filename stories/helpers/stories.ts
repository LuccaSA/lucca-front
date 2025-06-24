import { Args, ArgTypes, StoryObj } from '@storybook/angular';
import { PlayFunction, Renderer } from 'storybook/internal/types';

export interface StoryGeneratorArgs<TComponent> {
	name: string;
	description: string;
	template: string;
	neededImports?: { [key: string]: string[] };
	storyPartial?: Partial<StoryObj<TComponent>>;
	code?: string;
	codeLang?: string;
}

export type StoryGenerator<TComponent> = (args: StoryGeneratorArgs<TComponent>) => StoryObj<TComponent>;

export function generateMarkdownCodeBlock(lang: string, code: string): string {
	return `
\`\`\`${lang}
${code}
\`\`\`
`;
}

export function useDocumentationStory<TComponent>(story: StoryObj<TComponent>) {
	return {
		description: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			component: story.parameters['docs'].description.story,
		},
	};
}

export function getStoryGenerator<TComponent>(globalPartial: StoryObj<TComponent> = {}): StoryGenerator<TComponent> {
	return ({ name, description, template, neededImports, storyPartial, code, codeLang }) => {
		const importEntries = Object.entries(neededImports || {});
		const importList = importEntries.length
			? `\n\n**Imports nécessaires** :\n${generateMarkdownCodeBlock('ts', importEntries.map(([module, imports]) => `import { ${imports.join(', ')} } from '${module}';`).join('\n'))}`
			: '';

		const source = code
			? {
					language: codeLang || 'html',
					type: 'code',
					code,
				}
			: {
					language: 'html',
					type: 'code',
					code: template,
				};

		const args = { ...globalPartial.args, ...storyPartial?.args };

		return {
			...globalPartial,
			...storyPartial,
			name,
			args,
			argTypes: { ...globalPartial.argTypes, ...storyPartial?.argTypes },
			render: (storyArgs) => ({
				props: { ...args, ...storyArgs },
				template,
			}),
			parameters: {
				docs: {
					source,
					description: {
						story: `${description}${importList}`,
					},
				},
				...globalPartial.parameters,
				...storyPartial?.parameters,
			},
		};
	};
}

/**
 * Cleanup a story template for a proper ZeroHeight integration, this will ensure:
 * - no empty lines are in the middle of a component's template
 * - no in-line optional attributes are leaving empty spots of '    '
 * - story code will not start with one or more empty lines
 * @param template the template string to cleanup
 */
export function cleanupTemplate(template: string): string {
	return template
		.replace(/^\n+/, '')
		.replace(/\n{2,}\t/gm, '')
		.replace(/ {2,}/gm, ' ');
}

export function generateInputs(inputs: Record<string, unknown>, argTypes: ArgTypes, disableBooleanAttributes = false): string {
	return Object.entries(inputs).reduce((acc, [name, value]) => {
		const argType = argTypes[name];

		if (!argType || (argType['table'] && argType['table'].category !== 'inputs')) {
			return acc;
		}

		const defaultValue: unknown = argType['table']?.defaultValue?.summary;
		if (value === defaultValue || value === null || value === undefined) {
			return acc;
		}
		// Let's treat boolean inputs as booleanAttributes for stories
		if (!disableBooleanAttributes && typeof value === 'boolean') {
			if (value) {
				return `${acc} ${name}`;
			}
			return acc;
		}
		return `${acc} ${name}="${value.toString()}"`;
	}, '');
}

export function createTestStory<TRenderer extends Renderer, TArgs = Args>(story: StoryObj<TArgs>, test: PlayFunction<TRenderer, TArgs>): StoryObj {
	return {
		...story,
		name: `${story.name} TEST`,
		play: test,
	};
}
