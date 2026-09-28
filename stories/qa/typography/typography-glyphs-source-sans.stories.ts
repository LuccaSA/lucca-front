import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input, ViewEncapsulation } from '@angular/core';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { getMissingCharacters } from './typography-font-coverage.generated';
import { extractGlyphCharacters, GLYPH_TEXT_SELECTOR, glyphsGridStyles } from './typography-glyphs-grid';
import { highlightMissingCharacters, missingGlyphStyles, runAfterViewInit } from './typography-missing-glyphs';

const CHARACTERS = extractGlyphCharacters();

@Component({
	selector: 'typography-glyphs-source-sans-stories',
	templateUrl: './typography-glyphs-source-sans.stories.html',
	imports: [LuTooltipTriggerDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	styles: [glyphsGridStyles, missingGlyphStyles],
})
class TypographyGlyphsSourceSansStory implements AfterViewInit {
	private elementRef: ElementRef<HTMLElement> = inject(ElementRef);

	readonly fontWeight = input.required<number>();
	readonly fontStyle = input<'normal' | 'italic'>('normal');

	protected readonly characters = CHARACTERS;

	ngAfterViewInit(): void {
		runAfterViewInit(this.elementRef.nativeElement, (root) => {
			highlightMissingCharacters(root, GLYPH_TEXT_SELECTOR, getMissingCharacters('SourceSans', this.fontWeight(), this.fontStyle()), {
				highlightAncestorSelector: '.glyphsGrid-cell',
			});
		});
	}
}

interface GlyphsArgs {
	fontWeight: number;
	fontStyle: 'normal' | 'italic';
}

export default {
	title: 'QA/Typography/Glyphs/Source Sans',
	component: TypographyGlyphsSourceSansStory,
	argTypes: {
		fontWeight: { table: { disable: true } },
		fontStyle: { table: { disable: true } },
	},
	render: (args: GlyphsArgs) => ({
		props: { ...args },
		template: '<typography-glyphs-source-sans-stories [fontWeight]="fontWeight" [fontStyle]="fontStyle" />',
	}),
} as Meta<GlyphsArgs>;

export const Regular: StoryObj<GlyphsArgs> = { args: { fontWeight: 400, fontStyle: 'normal' } };
export const Semibold: StoryObj<GlyphsArgs> = { args: { fontWeight: 600, fontStyle: 'normal' } };
export const Bold: StoryObj<GlyphsArgs> = { args: { fontWeight: 700, fontStyle: 'normal' } };
export const Black: StoryObj<GlyphsArgs> = { args: { fontWeight: 800, fontStyle: 'normal' } };
