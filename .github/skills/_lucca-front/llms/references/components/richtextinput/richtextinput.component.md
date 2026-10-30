# richtextinput — Code & Implementation

**Sommaire**

- Angular
  - Text input


📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-fields-richtextinput-angular--docs)

## Angular

### Text input

```js
import { LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { luRichTextInputTranslations, RichTextInputComponent, RichTextInputToolbarComponent, RichTextPluginTagComponent } from '@lucca-front/ng/forms/rich-text-input';
import { HtmlFormatterDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/html';
import { MarkdownFormatterDirective, MarkdownFormatterWithTagsDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/markdown';
import { PlainTextFormatterWithTagsDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/plain-text';
```

```html
<lu-form-field label="Label">
	<lu-rich-text-input
		luWithMarkdownFormatter
		placeholder="Placeholder…"
		autoResize
		[(ngModel)]="model.example"
		[disabled]="disabled"
		[required]="required"
	>
		<lu-rich-text-input-toolbar />
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>
```

```html
<lu-form-field label="Label">
	<lu-rich-text-input
		luWithHtmlFormatter
		placeholder="Placeholder…"
		autoResize
		[(ngModel)]="model.example"
		[disabled]="disabled"
		[required]="required"
	>
		<lu-rich-text-input-toolbar />
		<lu-rich-text-plugin-tag
			[tags]="[
				{
					key: 'tag1',
					description: 'Tag 1',
				},
				{
					key: 'tag2',
					description: 'Tag 2',
				},
				{
					key: 'tag3',
					description: 'Tag 3',
				},
				{
					key: 'tag4',
					description: 'Tag 4',
					secondary: true,
				},
				{
					key: 'tag5',
					description: 'Prénom',
					secondary: true,
				},
				{
					key: 'tag6',
					description: 'Téléphone',
					secondary: true,
				},
			]"
		/>
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>
```

```html
<lu-form-field label="Label">
	<lu-rich-text-input
		luWithHtmlFormatter
		placeholder="Placeholder…"
		autoResize
		[(ngModel)]="model.example"
		[disabled]="disabled"
		[required]="required"
	>
		<lu-rich-text-input-toolbar />
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>
```

```html
<lu-form-field label="Label">
	<lu-rich-text-input
		luWithHtmlFormatter
		placeholder="Placeholder…"
		autoResize
		[(ngModel)]="model.example"
		[disabled]="disabled"
		[required]="required"
	>
		<lu-rich-text-input-toolbar />
		<lu-rich-text-plugin-tag
			[tags]="[
				{
					key: 'tag1',
					description: 'Tag 1',
				},
				{
					key: 'tag2',
					description: 'Tag 2',
				},
				{
					key: 'tag3',
					description: 'Tag 3',
				},
				{
					key: 'tag4',
					description: 'Tag 4',
					secondary: true,
					group: 'Groupe 2',
				},
				{
					key: 'tag6',
					description: 'Téléphone',
					secondary: true,
					group: 'Groupe 2',
				},
				{
					key: 'tag5',
					description: 'Prénom',
					secondary: true,
					group: 'Groupe 1',
				},
			]"
		/>
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>
```

```html
<lu-form-field label="Label">
	<lu-rich-text-input
		luWithMarkdownTagsFormatter
		placeholder="Placeholder…"
		autoResize
		[(ngModel)]="model.example"
		[disabled]="disabled"
		[required]="required"
	>
		<lu-rich-text-input-toolbar />
		<lu-rich-text-plugin-tag
			[tags]="[
				{
					key: 'tag1',
					description: 'Tag 1',
				},
				{
					key: 'tag2',
					description: 'Tag 2',
				},
				{
					key: 'tag3',
					description: 'Tag 3',
				},
				{
					key: 'tag4',
					description: 'Tag 4',
					secondary: true,
				},
				{
					key: 'tag5',
					description: 'Prénom',
					secondary: true,
				},
				{
					key: 'tag6',
					description: 'Téléphone',
					secondary: true,
				},
			]"
		/>
	</lu-rich-text-input>
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>
```
