import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, forwardRef, inject, Injector, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import { LU_FORM_INSTANCE } from './form-instance';
import { LuDialogRef } from '@lucca-front/ng/dialog';
import { focusFirstInvalidControl } from './focus-first-invalid';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'form[luForm]',
	template: '<ng-content />',
	styleUrl: './form.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'form',
		'[class.mod-maxWidth]': 'maxWidth()',
		'[class.dialog-inside-formOptional]': 'dialogRef !== null',
		'[attr.role]': 'presentation() ? "presentation" : null',
		'(submit)': 'onSubmit()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: LU_FORM_INSTANCE,
			useExisting: forwardRef(() => FormComponent),
		},
	],
})
export class FormComponent {
	protected readonly dialogRef = inject(LuDialogRef, { optional: true });

	readonly #elementRef = inject<ElementRef<HTMLFormElement>>(ElementRef);

	readonly #injector = inject(Injector);

	readonly maxWidth = input(false, { transform: luBooleanAttribute });

	readonly presentation = input(false, { transform: luBooleanAttribute });

	/**
	 * When enabled, submitting an invalid form moves focus to the first invalid field. Disabled by default.
	 */
	readonly focusInvalidOnSubmit = input(false, { transform: luBooleanAttribute });

	protected onSubmit(): void {
		if (!this.focusInvalidOnSubmit()) {
			return;
		}
		afterNextRender(
			() => {
				const form = this.#elementRef.nativeElement;
				if (form.classList.contains('ng-invalid')) {
					focusFirstInvalidControl(form);
				}
			},
			{ injector: this.#injector },
		);
	}
}
