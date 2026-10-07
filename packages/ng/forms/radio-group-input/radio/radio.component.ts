import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { luBooleanAttribute, LuClass, PortalContent, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { InputDirective, InputFramedComponent, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { FormLabelComponent } from '@lucca-front/ng/form-label';
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
import { RADIO_GROUP_INSTANCE } from '../radio-group-token';

let nextId = 0;

@Component({
	selector: 'lu-radio',
	imports: [ReactiveFormsModule, InlineMessageComponent, NgTemplateOutlet, InputDirective, InputFramedComponent, FormLabelComponent, ɵPresentationDisplayDefaultDirective],
	templateUrl: './radio.component.html',
	styleUrl: './radio.component.scss',
	host: {
		'[class.form-field]': '!framed()',
		'[id]': 'id',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [LuClass],
})
export class RadioComponent<T = unknown> {
	#luClass = inject(LuClass);
	#parentGroup = inject(RADIO_GROUP_INSTANCE);
	#cdr = inject(ChangeDetectorRef);

	/**
	 * Value written to the parent radio group control when this radio button is selected
	 */
	readonly value = input.required<T>();

	/**
	 * Disables this radio button only (the whole group can be disabled through its form control)
	 */
	readonly disabled = input(false, { transform: luBooleanAttribute });

	/**
	 * Inline message displayed below the radio button label
	 */
	readonly inlineMessage = input<PortalContent>();

	/**
	 * Tag displayed next to the radio button label
	 */
	readonly tag = input<string>();

	/**
	 * Additional content displayed inside the frame, only applies when the parent group is `framed`
	 */
	readonly framedPortal = input<PortalContent>();

	readonly arrow = computed(() => this.#parentGroup.arrow());
	readonly framed = computed(() => this.#parentGroup.framed());
	readonly framedCenter = computed(() => this.#parentGroup.framedCenter());
	readonly framedSize = computed(() => this.#parentGroup.framedSize());
	readonly size = computed(() => this.#parentGroup.size());

	public get ngControl() {
		return this.#parentGroup.ngControl;
	}

	public get formControl() {
		return this.ngControl.control;
	}

	public get name() {
		return this.#parentGroup.name;
	}

	id = `radio-${++nextId}`;

	constructor() {
		ɵeffectWithDeps([this.size, this.arrow], (size, arrow) => {
			this.#luClass.setState({
				[`mod-${size}`]: !!size,
				'mod-withArrow': arrow !== undefined,
			});
		});
		// We have to do this for presentation mode because otherwise, form value inits after component and because it's not a signal,
		// it doesn't trigger an update to show the presentation display
		if (this.ngControl?.valueChanges) {
			this.ngControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
				this.#cdr.markForCheck();
			});
		}
	}
}
