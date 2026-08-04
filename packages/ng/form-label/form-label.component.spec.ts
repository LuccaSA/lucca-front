import { LOCALE_ID } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { FormLabelComponent } from './form-label.component';

describe('FormLabelComponent', () => {
	describe('Polish pluralization of the counter accessible label', () => {
		it('should use the "few" form for a counterStatus of 2', async () => {
			await render('<label luFormLabel [counterStatus]="2" [counterMax]="10" data-testid="label">Field</label>', {
				imports: [FormLabelComponent],
				providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
			});

			expect(screen.getByTestId('label')).toHaveTextContent('2 znaki');
		});

		it('should use the "many" form for a counterStatus of 5', async () => {
			await render('<label luFormLabel [counterStatus]="5" [counterMax]="10" data-testid="label">Field</label>', {
				imports: [FormLabelComponent],
				providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
			});

			expect(screen.getByTestId('label')).toHaveTextContent('5 znaków');
		});
	});
});
