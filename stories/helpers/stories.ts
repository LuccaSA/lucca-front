import { LOCALE_ID } from '@angular/core';
import { applicationConfig, Args, ArgTypes, StoryObj } from '@storybook/angular-vite';
import { useState } from 'storybook/preview-api';

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

export function setStoryOptions<T extends string | number>(list: readonly T[]): Array<T | ''> {
	const hasEmpty = list.includes('' as T);
	return hasEmpty ? [...list] : ['', ...list];
}

export type InputAlias<T, A extends Partial<Record<keyof T, string>>> = Omit<T, keyof A | A[keyof A]> & { [K in keyof A as A[K]]: T[K & keyof T] };

export type SelectCommonAliasInput = { clearableInput: 'clearable'; loadingInput: 'loading' };

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

// TODO SIGNAL
// if name end with Input remove Input to have correct input name no alias || type generic pour appliquer les alias
export function generateInputs(inputs: Record<string, unknown>, argTypes: ArgTypes, disableBooleanAttributes = false): string {
	return Object.entries(inputs).reduce((acc, [name, value]) => {
		const argType = argTypes[name];

		// `models` are two-way bound inputs, so they are rendered as attributes just like `inputs`.
		// A category prefixed with `inputs`/`models` is still an input: multi-component stories split them
		// per host (`inputs`, `inputs (form-field)`…) so the Controls panel groups them separately.
		const category = argType?.['table']?.category as string | undefined;
		if (!argType || (argType['table'] && !category?.startsWith('inputs') && !category?.startsWith('models'))) {
			return acc;
		}

		const defaultValue: unknown = argType['table']?.defaultValue?.summary;
		if (value === defaultValue || value === null || value === undefined || (typeof value === 'string' && !value.length)) {
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

export interface StoryModel<T> {
	example: T;
}

/**
 * Holds the value bound to `ngModel` so it survives a control change, which would otherwise reset a value passed
 * directly in `props`. Lives as long as the mounted story.
 */
export function useStoryModel<T>(initialValue: T): StoryModel<T> {
	const [model] = useState<StoryModel<T>>(() => ({ example: initialValue }));
	return model;
}

/**
 * {@link useStoryModel} for a value also driven by a control. Re-seeds the model when that control changes,
 * comparing by reference — pass the arg itself, not a value rebuilt in `render`.
 */
export function useControlledStoryModel<T>(controlValue: T): StoryModel<T> {
	const [synced] = useState(() => ({ model: { example: controlValue }, controlValue }));

	if (controlValue !== synced.controlValue) {
		synced.controlValue = controlValue;
		synced.model.example = controlValue;
	}
	return synced.model;
}

export function createTestStory<TArgs = Args>(story: StoryObj<TArgs>, test: StoryObj<TArgs>['play']): StoryObj<TArgs> {
	// We don't handle function decorators at all
	const storyDecorators = typeof story.decorators === 'function' ? [] : story.decorators;
	return {
		...story,
		decorators: [
			...(storyDecorators || []),
			applicationConfig({
				providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
			}),
		],
		name: `${story.name} TEST`,
		play: test,
	};
}
