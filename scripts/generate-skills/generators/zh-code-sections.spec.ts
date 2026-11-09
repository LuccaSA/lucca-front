import { describe, expect, it } from 'vitest';
import { collectTemplateSymbols } from '../collectors/story-source';
import { cleanCodeSectionForExamples, completeZhImports } from './template-renderer';

/**
 * ZeroHeight curates the code shown next to each story, and used to win outright: an incomplete
 * curated import list dropped `ButtonComponent` under a `luButton` markup, and stripping every code
 * block from the implementation notes left "add this provider:" with nothing after the colon.
 */
describe('cleanCodeSectionForExamples', () => {
	it('drops a block that only holds imports', () => {
		expect(cleanCodeSectionForExamples("Intro\n\n```ts\nimport { A } from '@lucca-front/ng/a';\n```\n\nOutro")).toBe('Intro\n\nOutro');
	});

	it('keeps a block the prose relies on', () => {
		const section = 'Add this provider:\n\n```ts\nproviders: [{ provide: SELECT_RESPONSIVE_DIALOG, useValue: true }];\n```';

		expect(cleanCodeSectionForExamples(section)).toBe(section);
	});
});

describe('collectTemplateSymbols', () => {
	it('reads every imports array, wrapped or not, minus app-level modules', () => {
		const story = 'moduleMetadata({ imports: [ButtonComponent, BrowserAnimationsModule] })\n@Component({ imports: [\n\tFormsModule,\n] })';

		expect(collectTemplateSymbols(story)).toEqual(['ButtonComponent', 'FormsModule']);
	});
});

describe('completeZhImports', () => {
	const zh = ["import { CalloutDisclosureComponent } from '@lucca-front/ng/callout';"];

	it('adds back a story import the template compiles against', () => {
		expect(completeZhImports(zh, ["import { ButtonComponent } from '@lucca-front/ng/button';"], ['ButtonComponent'])).toEqual([...zh, "import { ButtonComponent } from '@lucca-front/ng/button';"]);
	});

	it('leaves out story plumbing absent from the imports arrays', () => {
		expect(completeZhImports(zh, ["import { provideRouter } from '@angular/router';", "import { CALLOUT_SIZE } from '@lucca-front/ng/callout';"], [])).toEqual(zh);
	});

	it('extends the curated line of the same module instead of importing it twice', () => {
		expect(completeZhImports(zh, ["import { CALLOUT_SIZE, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';"], ['CalloutFeedbackListComponent'])).toEqual([
			"import { CalloutDisclosureComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';",
		]);
	});
});
