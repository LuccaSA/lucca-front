import { LOCALE_ID } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { SoftwareIconWrapperComponent } from './software-icon-wrapper.component';

describe('SoftwareIconWrapperComponent', () => {
	// software-icon-wrapper has no Polish translation yet (see translations.ts), so we exercise the
	// plural-resolution mechanism itself via an `[intl]` override rather than the real (untranslated) copy.
	describe('plural resolution of the "see more" label (via intl override)', () => {
		const iconsTemplate = (count: number): string => Array.from({ length: count }, (_, i) => `<ng-template>Icon ${i + 1}</ng-template>`).join('\n');

		const intl = { seeMore: { few: '{{count}} few-form', many: '{{count}} many-form', other: '{{count}} other-form' } };

		it('should use the "few" form when 2 icons are hidden (pl locale)', async () => {
			await render(`<lu-software-icon-wrapper [max]="2" [intl]="intl" data-testid="wrapper">${iconsTemplate(4)}</lu-software-icon-wrapper>`, {
				imports: [SoftwareIconWrapperComponent],
				providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
				componentProperties: { intl },
			});

			expect(screen.getByTestId('wrapper')).toHaveTextContent('2 few-form');
		});

		it('should use the "many" form when 5 icons are hidden (pl locale)', async () => {
			await render(`<lu-software-icon-wrapper [max]="2" [intl]="intl" data-testid="wrapper">${iconsTemplate(7)}</lu-software-icon-wrapper>`, {
				imports: [SoftwareIconWrapperComponent],
				providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
				componentProperties: { intl },
			});

			expect(screen.getByTestId('wrapper')).toHaveTextContent('5 many-form');
		});
	});
});
