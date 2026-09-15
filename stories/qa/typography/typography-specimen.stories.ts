import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, ViewEncapsulation } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { getMissingCharacters } from './typography-font-coverage.generated';
import { languagePangrams } from './typography-fonts-content';
import { highlightMissingCharacters, missingGlyphStyles, runAfterViewInit } from './typography-missing-glyphs';

@Component({
	selector: 'typography-specimen-stories',
	templateUrl: './typography-specimen.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	styles: [missingGlyphStyles],
})
class TypographySpecimenStory implements AfterViewInit {
	private elementRef: ElementRef<HTMLElement> = inject(ElementRef);

	protected readonly languagePangrams = languagePangrams;

	ngAfterViewInit(): void {
		runAfterViewInit(this.elementRef.nativeElement, (root) => {
			highlightMissingCharacters(root, '.pr-u-fontFamily', getMissingCharacters('SourceSans', 400));
			highlightMissingCharacters(root, '.pr-u-fontFamilyBrand', getMissingCharacters('LuccaSans', 400));
		});
	}
}

export default {
	title: 'QA/Typography/Specimen',
	component: TypographySpecimenStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TypographySpecimenStory> = {
	args: {},
	render: template,
};
