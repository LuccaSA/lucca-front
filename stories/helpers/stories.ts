import { StoryObj } from '@storybook/angular';

export type StoryGenerator<TComponent> = (
	name: string,
	description: string,
	template: string,
	neededImports?: { [key: string]: string[] },
	storyPartial?: Partial<StoryObj<TComponent>>,
) => StoryObj<TComponent>;

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
	return (name, description, template, neededImports, storyPartial = {}) => {
		const importEntries = Object.entries(neededImports || {});
		const importList = importEntries.length
			? `\n\n**Imports nécessaires** :\n${generateMarkdownCodeBlock('ts', importEntries.map(([module, imports]) => `import { ${imports.join(', ')} } from '${module}';`).join('\n'))}`
			: '';

		return {
			name,
			args: { ...globalPartial.args, ...storyPartial.args },
			render: (args) => ({
				props: args,
				template,
			}),
			parameters: {
				docs: {
					source: {
						language: 'html',
						type: 'code',
						code: template,
					},
					description: {
						story: `${description}${importList}`,
					},
				},
				...globalPartial.parameters,
				...storyPartial.parameters,
			},
			...globalPartial,
			...storyPartial,
		};
	};
}
