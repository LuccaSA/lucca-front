import { Component, LOCALE_ID } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { SoftwareIconWrapperItemDirective } from './software-icon-wrapper-item.directive';
import { SoftwareIconWrapperComponent } from './software-icon-wrapper.component';

@Component({
	selector: 'lu-software-icon-wrapper-loop-test',
	template: `
		<lu-software-icon-wrapper max="5" data-testid="wrapper">
			@for (icon of icons; track icon) {
				<span *SoftwareIconWrapperItem>{{ icon }}</span>
			}
		</lu-software-icon-wrapper>
	`,
	imports: [SoftwareIconWrapperComponent, SoftwareIconWrapperItemDirective],
})
class LoopTestComponent {
	icons = Array.from({ length: 7 }, (_, i) => `Icon ${i + 1}`);
}

@Component({
	selector: 'lu-software-icon-wrapper-deprecated-selector-test',
	template: `
		<lu-software-icon-wrapper max="5" data-testid="wrapper">
			@for (icon of icons; track icon) {
				<span *luSoftwareIconWrapperItem>{{ icon }}</span>
			}
		</lu-software-icon-wrapper>
	`,
	imports: [SoftwareIconWrapperComponent, SoftwareIconWrapperItemDirective],
})
class DeprecatedSelectorTestComponent {
	icons = Array.from({ length: 7 }, (_, i) => `Icon ${i + 1}`);
}

describe(SoftwareIconWrapperComponent.name, () => {
	describe('items declared in a loop', () => {
		it('should render max items and count only the hidden ones', async () => {
			const { container } = await render(LoopTestComponent);

			expect(container.querySelectorAll('.softwareIconWrapper-list-item')).toHaveLength(5);
			expect(screen.getByTestId('wrapper')).toHaveTextContent('See the 2 additional software programs');
		});
	});

	describe('items declared with the deprecated luSoftwareIconWrapperItem selector', () => {
		it('should still be rendered and counted', async () => {
			const { container } = await render(DeprecatedSelectorTestComponent);

			expect(container.querySelectorAll('.softwareIconWrapper-list-item')).toHaveLength(5);
			expect(screen.getByTestId('wrapper')).toHaveTextContent('See the 2 additional software programs');
		});
	});

	// software-icon-wrapper has no Polish translation yet (see translations.ts), so we exercise the
	// plural-resolution mechanism itself via an `[intl]` override rather than the real (untranslated) copy.
	describe('plural resolution of the "see more" label (via intl override)', () => {
		const iconsTemplate = (count: number): string => Array.from({ length: count }, (_, i) => `<ng-template SoftwareIconWrapperItem>Icon ${i + 1}</ng-template>`).join('\n');

		const intl = { seeMore: { few: '{{count}} few-form', many: '{{count}} many-form', other: '{{count}} other-form' } };

		it('should use the "few" form when 2 icons are hidden (pl locale)', async () => {
			await render(`<lu-software-icon-wrapper [max]="2" [intl]="intl" data-testid="wrapper">${iconsTemplate(4)}</lu-software-icon-wrapper>`, {
				imports: [SoftwareIconWrapperComponent, SoftwareIconWrapperItemDirective],
				providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
				componentProperties: { intl },
			});

			expect(screen.getByTestId('wrapper')).toHaveTextContent('2 few-form');
		});

		it('should use the "many" form when 5 icons are hidden (pl locale)', async () => {
			await render(`<lu-software-icon-wrapper [max]="2" [intl]="intl" data-testid="wrapper">${iconsTemplate(7)}</lu-software-icon-wrapper>`, {
				imports: [SoftwareIconWrapperComponent, SoftwareIconWrapperItemDirective],
				providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
				componentProperties: { intl },
			});

			expect(screen.getByTestId('wrapper')).toHaveTextContent('5 many-form');
		});
	});
});
