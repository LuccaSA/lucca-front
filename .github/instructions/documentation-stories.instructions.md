---
description: "Use when writing or editing Storybook documentation stories in stories/documentation/. Covers file structure, naming conventions, Angular/HTML&CSS patterns, argTypes, helpers, and French description requirements."
applyTo: "stories/documentation/**/*.stories.ts"
---

# Documentation Stories — Conventions

**Title format**: `Documentation/<Category>/<ComponentName>/Angular/<Variant>` or `.../HTML&CSS/<Variant>`

**Categories**: `actions` `feedback` `forms` `icons` `integration` `intl` `listings` `loaders` `navigation` `overlays` `structure` `texts` `toolbox` `users`

## Angular pattern

```ts
import { MyComponent, MY_ENUM } from '@lucca-front/ng/package';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs, setStoryOptions } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Category/Component/Angular/Variant',
	component: MyComponent,
	decorators: [moduleMetadata({ imports: [OtherComponent] })],
	render: ({ myInput, ...inputs }, { argTypes }) => ({
		template: `<lu-my myInput="${myInput}"${generateInputs(inputs, argTypes)} />`,
	}),
} as Meta;

export const Basic: StoryObj<MyComponent> = {
	argTypes: {
		myInput: { options: setStoryOptions(MY_ENUM), control: { type: 'select' }, description: 'Description en français.' },
		boolProp: { description: 'Description en français.' },
	},
	args: { myInput: '', boolProp: false },
};
```

## HTML&CSS pattern

```ts
import { Meta, StoryObj } from '@storybook/angular';
interface S {}
export default { title: 'Documentation/Category/Component/HTML&CSS/Variant', argTypes: {} } as Meta;
const Template = (args: S) => ({ props: args, template: `<div class="component mod-variant">Content</div>`, styles: [`:host { display: flex; gap: 1rem; }`] });
export const MyVariant: StoryObj<S> = { args: {}, render: Template };
```

## Helpers (`stories/helpers/stories`)

| Helper | Use |
|--------|-----|
| `setStoryOptions(ENUM)` | Prepends `''` to enum array for select |
| `generateInputs(inputs, argTypes)` | Serializes args to Angular attribute bindings |
| `cleanupTemplate(tpl)` | Strips empty lines/extra spaces |
| `createTestStory(story, playFn)` | Sibling test story with play function |
| `getStoryGenerator(partial)` | Factory: `{ name, description, template, neededImports }` |

Common arg types: `PaletteArgType`, `HiddenArgType`, `stateArgType` from `stories/helpers/common-arg-types`.

## argTypes rules

- **Descriptions in French** — `'Modifie X du composant.'`
- Prefixes: `[v20.3]` new · `[Deprecated]` · `[Story]` (not a real @Input)
- Enum selects: `setStoryOptions(ENUM)` + `control: { type: 'select' }`
- Boolean: description only, control auto-detected
- Conditional: `if: { arg: 'x', truthy: true }` or `if: { arg: 'x', neq: 'val' }`
- Hidden: `table: { disable: true }, control: undefined`
- Default args: `''` for selects, `false` for booleans

## Imports

- Components: `@lucca-front/ng/<package>`
- Palette: `@lucca/prisme/core`
- Test: `createTestStory` from `stories/helpers/stories` + `expect, within` from `storybook/test`
