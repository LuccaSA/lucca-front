import { LOCALE_ID } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import { ILuUser } from './user.model';
import { LuUserSelectInputComponent } from './select';

describe('user select', () => {
	describe('Polish pluralization of the selected-count label', () => {
		const users = (count: number): ILuUser[] => Array.from({ length: count }, (_, i) => ({ id: i + 1, firstName: `First${i + 1}`, lastName: `Last${i + 1}` }));

		it('should use the "few" form for 2 selected users', async () => {
			const control = new FormControl<ILuUser[]>(users(2));

			await render('<lu-user-select [multiple]="true" [formControl]="control" data-testid="lu-select" />', {
				imports: [LuUserSelectInputComponent, ReactiveFormsModule],
				providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
				componentProperties: { control },
			});

			expect(screen.getByTestId('lu-select')).toHaveTextContent('użytkownicy');
		});

		it('should use the "many" form for 5 selected users', async () => {
			const control = new FormControl<ILuUser[]>(users(5));

			await render('<lu-user-select [multiple]="true" [formControl]="control" data-testid="lu-select" />', {
				imports: [LuUserSelectInputComponent, ReactiveFormsModule],
				providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
				componentProperties: { control },
			});

			expect(screen.getByTestId('lu-select')).toHaveTextContent('użytkowników');
		});
	});
});
