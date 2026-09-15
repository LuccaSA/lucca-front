import { LOCALE_ID } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import { ILuUser } from './user.model';
import { LuUserSelectInputComponent } from './select';

describe('user select', () => {
	// `users` has no Polish plural forms in Lokalise yet (see translations.ts), so we exercise the
	// plural-resolution mechanism itself via an `[intl]` override rather than the real (untranslated) copy.
	describe('plural resolution of the selected-count label (via intl override)', () => {
		const users = (count: number): ILuUser[] => Array.from({ length: count }, (_, i) => ({ id: i + 1, firstName: `First${i + 1}`, lastName: `Last${i + 1}` }));
		const intl = { users: { few: 'few-form', many: 'many-form', other: 'other-form' } };

		it('should use the "few" form for 2 selected users (pl locale)', async () => {
			const control = new FormControl<ILuUser[]>(users(2));

			await render('<lu-user-select [multiple]="true" [formControl]="control" [intl]="intl" data-testid="lu-select" />', {
				imports: [LuUserSelectInputComponent, ReactiveFormsModule],
				providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
				componentProperties: { control, intl },
			});

			expect(screen.getByTestId('lu-select')).toHaveTextContent('few-form');
		});

		it('should use the "many" form for 5 selected users (pl locale)', async () => {
			const control = new FormControl<ILuUser[]>(users(5));

			await render('<lu-user-select [multiple]="true" [formControl]="control" [intl]="intl" data-testid="lu-select" />', {
				imports: [LuUserSelectInputComponent, ReactiveFormsModule],
				providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
				componentProperties: { control, intl },
			});

			expect(screen.getByTestId('lu-select')).toHaveTextContent('many-form');
		});
	});
});
