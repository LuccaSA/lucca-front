import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuClass, PortalContent, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { FormFieldComponent, InputDirective, InputFramedComponent } from '@lucca-front/ng/form-field';
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
import { RADIO_GROUP_INSTANCE } from '../radio-group-token';

let nextId = 0;

@Component({
	selector: 'lu-radio',
	imports: [ReactiveFormsModule, InlineMessageComponent, NgTemplateOutlet, InputDirective, InputFramedComponent, FormFieldComponent],
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

	public get formControl() {
		return this.#parentGroup.ngControl.control;
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
	}
}
