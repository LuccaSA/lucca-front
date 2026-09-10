import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, ViewEncapsulation } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'typography-fonts-stories',
	templateUrl: './typography-fonts.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	styles: [
		`
			.typographyFonts-missingGlyph {
				background-color: red;
			}
		`,
	],
})
class TypographyFontsStory implements AfterViewInit {
	private elementRef: ElementRef<HTMLElement> = inject(ElementRef);

	ngAfterViewInit(): void {
		this.highlightMissingGlyphs();
	}

	private async highlightMissingGlyphs(): Promise<void> {
		const context = document.createElement('canvas').getContext('2d');
		if (!context) {
			return;
		}

		const paragraphs = [...this.elementRef.nativeElement.querySelectorAll<HTMLElement>('.pr-u-fontFamily, .pr-u-fontFamilyBrand')];
		const targetFonts = paragraphs.map((paragraph) =>
			getComputedStyle(paragraph)
				.fontFamily.split(',')[0]
				.trim()
				.replace(/^['"]|['"]$/g, ''),
		);

		await Promise.allSettled(
			paragraphs.map((paragraph, index) => document.fonts.load(`64px "${targetFonts[index]}"`, paragraph.textContent ?? '')),
		);

		paragraphs.forEach((paragraph, index) => {
			const targetFont = targetFonts[index];
			const characters = Array.from(paragraph.textContent ?? '');

			const children: (Node | string)[] = [];
			let textBuffer = '';

			for (const character of characters) {
				if (this.isLikelyFallback(context, character, targetFont)) {
					if (textBuffer) {
						children.push(textBuffer);
						textBuffer = '';
					}
					const span = document.createElement('span');
					span.textContent = character;
					span.classList.add('typographyFonts-missingGlyph');
					children.push(span);
				} else {
					textBuffer += character;
				}
			}
			if (textBuffer) {
				children.push(textBuffer);
			}

			paragraph.replaceChildren(...children);
		});
	}

	private isLikelyFallback(context: CanvasRenderingContext2D, character: string, targetFont: string): boolean {
		if ((character.codePointAt(0) ?? 0) < 0x80) {
			return false;
		}

		const fontSize = '64px';

		context.font = `${fontSize} "${targetFont}", monospace`;
		const widthWithTargetFont = context.measureText(character).width;

		context.font = `${fontSize} monospace`;
		const widthWithFallbackOnly = context.measureText(character).width;

		return Math.abs(widthWithTargetFont - widthWithFallbackOnly) < 0.05;
	}
}

export default {
	title: 'QA/Typography/Fonts',
	component: TypographyFontsStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TypographyFontsStory> = {
	args: {},
	render: template,
};
