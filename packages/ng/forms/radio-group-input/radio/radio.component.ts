import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuClass, PortalContent } from '@lucca-front/ng/core';
import { InputDirective, InputFramedComponent } from '@lucca-front/ng/form-field';
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
import { RADIO_GROUP_INSTANCE } from '../radio-group-token';

let nextId = 0;

@Component({
	selector: 'lu-radio',
	imports: [ReactiveFormsModule, InlineMessageComponent, NgTemplateOutlet, InputDirective, InputFramedComponent],
	templateUrl: './radio.component.html',
	styleUrl: './radio.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.form-field]': '!framed',
		'[attr.id]': 'id',
	},
	providers: [LuClass],
})
export class RadioComponent<T = unknown> implements OnChanges {
	#luClass = inject(LuClass);

	#parentGroup = inject(RADIO_GROUP_INSTANCE);

	@Input({ required: true })
	value: T;

	@Input({ transform: booleanAttribute })
	disabled: boolean;

	@Input()
	inlineMessage: PortalContent;

	@Input()
	tag: string;

	@Input()
	framedPortal: PortalContent;

	public get arrow() {
		return this.#parentGroup.arrow;
	}

	public get framed() {
		return this.#parentGroup.framed();
	}

	public get framedCenter() {
		return this.#parentGroup.framedCenter();
	}

	public get framedSize() {
		return this.#parentGroup.framedSize();
	}

	public get formControl() {
		return this.#parentGroup.ngControl.control;
	}

	public get name() {
		return this.#parentGroup.name;
	}

	id = `radio-${++nextId}`;

	ngOnChanges(): void {
		this.#luClass.setState({
			[`mod-${this.#parentGroup.size}`]: !!this.#parentGroup.size,
			'mod-withArrow': this.arrow !== undefined,
		});
	}
}
