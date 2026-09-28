import { describe, expect, it } from 'vitest';
import { classifyFramework } from './storybook';
import { detectFrameworkFromSource } from './story-source';

/**
 * The three tiers that decide whether a story documents the Angular API or the HTML/CSS one.
 *
 * Regression under test: every story outside an `angular/` folder used to be declared html-css —
 * 164 of 596 stories at v21.3.1, 60 of them Angular. That filed Angular examples under
 * `## HTML/CSS` and concatenated their TypeScript imports into the component's SCSS block.
 */
describe('classifyFramework', () => {
	const title = (t: string) => t.split('/');

	it('trusts the angular/ folder', () => {
		expect(classifyFramework('./stories/documentation/forms/time/angular/time-picker-basic.stories.ts', title('Documentation/Forms/Time'))).toEqual({
			framework: 'angular',
			confident: true,
		});
	});

	it('trusts the html&css/ folder', () => {
		expect(classifyFramework('./stories/documentation/forms/time/html&css/time-picker-basic.stories.ts', title('Documentation/Forms/Time'))).toEqual({
			framework: 'html-css',
			confident: true,
		});
	});

	it('falls back to the framework segment of the Storybook title', () => {
		expect(classifyFramework('./stories/documentation/overlays/dialog/dialog-basic.stories.ts', title('Documentation/Overlays/Dialog/Angular/Basic'))).toEqual({
			framework: 'angular',
			confident: true,
		});
		expect(classifyFramework('./stories/documentation/forms/date2/basic-html.stories.ts', title('Documentation/Forms/Date2/Calendar/HTML & CSS'))).toEqual({
			framework: 'html-css',
			confident: true,
		});
	});

	it('reports a flat file with no framework segment as undecided, never as a decision', () => {
		// The exact shape of the bug: `stories/documentation/forms/date2/date-range-input.stories.ts`
		// is a pure Angular story whose title carries no framework segment.
		expect(classifyFramework('./stories/documentation/forms/date2/date-range-input.stories.ts', title('Documentation/Forms/Date2/DateRangeInput'))).toEqual({
			framework: 'html-css',
			confident: false,
		});
	});

	it('does not mistake an unrelated path segment for the folder layout', () => {
		expect(classifyFramework('./stories/documentation/toolbox/angularities/basic.stories.ts', title('Documentation/Toolbox/Angularities')).confident).toBe(false);
	});
});

describe('detectFrameworkFromSource', () => {
	it('reads moduleMetadata as Angular', () => {
		const src = `
			import { moduleMetadata } from '@storybook/angular';
			export default { title: 'Documentation/Forms/Date2/DateRangeInput', decorators: [moduleMetadata({ imports: [] })] };
		`;
		expect(detectFrameworkFromSource(src)).toBe('angular');
	});

	it('reads a component: declaration as Angular', () => {
		const src = `
			export default {
				title: 'Documentation/Forms/Select',
				component: SimpleSelectComponent,
			};
		`;
		expect(detectFrameworkFromSource(src)).toBe('angular');
	});

	it('treats a template-only story as HTML/CSS', () => {
		const src = `
			import { Meta, StoryObj } from '@storybook/angular';
			export default { title: 'Documentation/Texts/Label/Basic' } as Meta;
			function getTemplate(args) { return \`<label class="formLabel">Label</label>\`; }
		`;
		expect(detectFrameworkFromSource(src)).toBe('html-css');
	});

	it('does not treat an import from @storybook/angular as an Angular signal', () => {
		// Every story imports it, html&css ones included — using it would misclassify all 281.
		expect(detectFrameworkFromSource("import { Meta } from '@storybook/angular';")).toBe('html-css');
	});

	it('does not treat Angular binding syntax in raw markup as an Angular signal', () => {
		// The repo's own html&css stories render inside Storybook Angular and use bindings in raw
		// HTML: `(click)="…"` in texts/clear, `[attr.style]="…"` in loaders/gauge. Using bindings as
		// a signal misclassifies 29 legitimate html&css stories at v21.3.1.
		const src = `
			export default { title: 'Documentation/Texts/Clear/Basic' };
			const tpl = \`<a href="#" (click)="$event.preventDefault()" class="clear"></a>\`;
		`;
		expect(detectFrameworkFromSource(src)).toBe('html-css');
	});
});
