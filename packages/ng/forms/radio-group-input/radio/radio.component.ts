import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { LuClass, PortalContent, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { InputDirective, InputFramedComponent, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { FormLabelComponent } from '@lucca-front/ng/form-label';
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
import { RADIO_GROUP_INSTANCE } from '../radio-group-token';

let nextId = 0;

@Component({
	selector: 'lu-radio',
	imports: [InlineMessageComponent, NgTemplateOutlet, InputDirective, InputFramedComponent, FormLabelComponent, ɵPresentationDisplayDefaultDirective],
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

	readonly checked = computed(() => this.#parentGroup.value() === this.value());
	readonly isDisabled = computed(() => this.#parentGroup.disabled() || this.disabled());
	readonly name = computed(() => this.#parentGroup.name());

	id = `radio-${++nextId}`;

	constructor() {
		ɵeffectWithDeps([this.size, this.arrow], (size, arrow) => {
			this.#luClass.setState({
				[`mod-${size}`]: !!size,
				'mod-withArrow': arrow !== undefined,
			});
		});
	}

	protected onChange() {
		this.#parentGroup.value.set(this.value());
	}

	protected onBlur() {
		this.#parentGroup.touch.emit();
	}
}
