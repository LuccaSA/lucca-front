import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuClass, PortalContent, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { InputDirective, InputFramedComponent, PresentationDisplayDirective } from '@lucca-front/ng/form-field';
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
import { RADIO_GROUP_INSTANCE } from '../radio-group-token';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

let nextId = 0;

@Component({
	selector: 'lu-radio',
	imports: [ReactiveFormsModule, InlineMessageComponent, NgTemplateOutlet, InputDirective, InputFramedComponent, PresentationDisplayDirective],
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

	readonly value = input.required<T>();

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly inlineMessage = input<PortalContent>();

	readonly tag = input<string>();

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
		this.ngControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
			this.#cdr.markForCheck();
		});
	}
}
