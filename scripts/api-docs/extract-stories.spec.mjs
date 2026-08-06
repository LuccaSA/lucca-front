/**
 * Unit tests for the static Storybook-stories extraction (ts-morph, no Storybook
 * runtime, no browser). Behaviour is exercised through `extractStoriesFile` over
 * in-memory sources modeled on the real `stories/documentation` files — both the
 * Angular arm (Meta-level render + per-story argTypes) and the HTML&CSS arm
 * (Template indirection through a local function). Runs under the `api-docs`
 * vitest project (Node environment).
 */
import { describe, expect, test } from 'vitest';

import { Project } from 'ts-morph';

import { extractStoriesFile, groupByComponent, parseTitle, renderStoriesSection } from './extract-stories.mjs';

/** Parse one in-memory stories source and extract it. */
function storiesFrom(code) {
	const project = new Project({ useInMemoryFileSystem: true });
	return extractStoriesFile(project.createSourceFile('demo.stories.ts', code));
}

/** Angular arm: default-export Meta with a render template + per-story argTypes. */
const ANGULAR_STORY = `
  import { Meta, StoryObj } from '@storybook/angular-vite';
  export default {
    title: 'Documentation/Actions/Button/Angular/Basic',
    render: ({ luButton, ...inputs }, { argTypes }) => {
      return {
        template: \`<button type="button" luButton>Button</button>\`,
      };
    },
  } as Meta;
  export const Basic: StoryObj = {
    argTypes: {
      luButton: {
        options: ['', 'outlined'],
        description: 'Modifie la hierarchie ou le style du bouton.<br>[v20.3] AI',
      },
      size: { description: 'Modifie la taille du composant.' },
      block: { control: { type: 'boolean' } },
    },
    args: { luButton: '' },
  };
  export const BasicTEST = createTestStory(Basic, async () => {});
`;

/** HTML&CSS arm: template behind a local Template function and a getTemplate helper. */
const HTML_STORY = `
  import { Meta, StoryObj } from '@storybook/angular-vite';
  const meta = {
    title: 'Documentation/Actions/Button/HTML&CSS/Size',
    argTypes: {},
  } as Meta;
  export default meta;
  function getTemplate(args: unknown): string {
    return \`<button type="button" class="button mod-S">Button</button>\`;
  }
  const Template = (args: unknown) => ({
    props: args,
    template: getTemplate(args),
  });
  export const SizeButton: StoryObj = { args: {}, render: Template };
`;

describe('parseTitle', () => {
	const cases = [
		{
			label: 'full documentation path',
			title: 'Documentation/Actions/Button/Angular/Basic',
			expected: { category: 'Actions', component: 'Button', arm: 'Angular', variant: 'Basic' },
		},
		{
			label: 'variant with several segments',
			title: 'Documentation/Forms/CheckboxInput/HTML&CSS/States/Disabled',
			expected: { category: 'Forms', component: 'CheckboxInput', arm: 'HTML&CSS', variant: 'States/Disabled' },
		},
		{
			label: 'short path falls back gracefully',
			title: 'Documentation/Intl',
			expected: { category: 'Intl', component: '', arm: '', variant: '' },
		},
	];
	test.each(cases)('$label', ({ title, expected }) => {
		expect(parseTitle(title)).toEqual(expected);
	});
});

describe('Angular arm extraction', () => {
	const file = storiesFrom(ANGULAR_STORY);

	test('reads the Meta title from the default-export object literal', () => {
		expect(file.title).toBe('Documentation/Actions/Button/Angular/Basic');
	});

	test('extracts the render template literal', () => {
		expect(file.templates).toEqual(['<button type="button" luButton>Button</button>']);
	});

	test('keeps object-literal story exports and skips createTestStory wrappers', () => {
		expect(file.stories.map((s) => s.name)).toEqual(['Basic']);
	});

	test('collects argTypes descriptions and ignores props without one', () => {
		expect(file.stories[0].argTypes).toEqual([
			{ name: 'luButton', description: 'Modifie la hierarchie ou le style du bouton.<br>[v20.3] AI' },
			{ name: 'size', description: 'Modifie la taille du composant.' },
		]);
	});
});

describe('HTML&CSS arm extraction', () => {
	const file = storiesFrom(HTML_STORY);

	test('reads the Meta title through the identifier default export', () => {
		expect(file.title).toBe('Documentation/Actions/Button/HTML&CSS/Size');
	});

	test('resolves the template through one level of local indirection', () => {
		expect(file.templates).toEqual(['<button type="button" class="button mod-S">Button</button>']);
	});

	test('keeps the story export with no argTypes', () => {
		expect(file.stories).toEqual([{ name: 'SizeButton', argTypes: [] }]);
	});
});

test('extracts a template passed as literal argument to a helper call (cleanupTemplate idiom)', () => {
	const file = storiesFrom(`
	  export default { title: 'Documentation/Forms/Fields/CheckboxField/Angular' } as Meta;
	  export const Basic = {
	    render: (args: unknown) => ({
	      template: cleanupTemplate(\`<lu-form-field><lu-checkbox-input /></lu-form-field>\`),
	    }),
	  };
	`);
	expect(file.templates).toEqual(['<lu-form-field><lu-checkbox-input /></lu-form-field>']);
});

describe('groupByComponent', () => {
	const files = [
		{ title: 'Documentation/Actions/Button/Angular/Basic', stories: [{ name: 'Basic', argTypes: [] }], templates: ['<a>'] },
		{ title: 'Documentation/Actions/Button/HTML&CSS/Size', stories: [{ name: 'Size', argTypes: [] }], templates: ['<b>'] },
		{ title: 'Documentation/Forms/Checkbox/Angular/Basic', stories: [{ name: 'Basic', argTypes: [] }], templates: [] },
	];
	const groups = groupByComponent(files);

	test('groups files by category/component and keeps both arms together', () => {
		expect(groups.map((g) => g.key)).toEqual(['Actions/Button', 'Forms/Checkbox']);
		expect(groups[0].files.length).toBe(2);
	});
});

describe('renderStoriesSection', () => {
	const groups = groupByComponent([
		{
			title: 'Documentation/Actions/Button/Angular/Basic',
			stories: [{ name: 'Basic', argTypes: [{ name: 'size', description: 'Modifie la taille.<br>[v20.3]' }] }],
			templates: ['<button luButton>Go</button>'],
		},
	]);
	const out = renderStoriesSection(groups);

	test('renders the component heading, arm, template fence and argTypes table', () => {
		expect(out).toMatch(/^## Actions \/ Button$/m);
		expect(out).toMatch(/^### Angular — Basic$/m);
		expect(out).toMatch(/```html\n<button luButton>Go<\/button>\n```/);
		expect(out).toMatch(/\| `size` \| Modifie la taille\. \[v20\.3\] \|/);
	});

	test('is deterministic — identical input yields byte-identical output', () => {
		expect(renderStoriesSection(groups)).toBe(renderStoriesSection(groups));
	});
});
