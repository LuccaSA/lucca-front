import { NgIf, NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, HostBinding, inject, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuClass, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
import { FramedInputComponent } from '../../framed-input/framed-input.component';
import { RADIO_GROUP_INSTANCE } from '../radio-group-token';

let nextId = 0;

@Component({
	selector: 'lu-radio',
	standalone: true,
	imports: [ReactiveFormsModule, InlineMessageComponent, NgIf, NgTemplateOutlet, PortalDirective, InputDirective, FramedInputComponent],
	templateUrl: './radio.component.html',
	styleUrl: './radio.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
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
	inlineMessage: string;

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

	@HostBinding('class.form-field')
	public get notFramed() {
		return !this.framed;
	}

	public get formControl() {
		return this.#parentGroup.ngControl.control;
	}

	public get name() {
		return this.#parentGroup.name;
	}

	@HostBinding('id')
	id = `radio-${++nextId}`;

	ngOnChanges(): void {
		this.#luClass.setState({
			[`mod-${this.#parentGroup.size}`]: !!this.#parentGroup.size,
			'mod-withArrow': this.arrow !== undefined,
		});
	}
}
