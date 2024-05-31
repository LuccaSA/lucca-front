import { booleanAttribute, ChangeDetectionStrategy, Component, HostBinding, inject, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from '@lucca-front/ng/form-field';
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
import { NgIf } from '@angular/common';
import { RADIO_GROUP_INSTANCE } from '../radio-group-token';
import { LuClass } from '@lucca-front/ng/core';

let nextId = 0;

@Component({
	selector: 'lu-radio',
	standalone: true,
	imports: [ReactiveFormsModule, InputDirective, InlineMessageComponent, NgIf],
	templateUrl: './radio.component.html',
	styleUrl: './radio.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'form-field',
	},
	providers: [LuClass],
})
export class RadioComponent<T = unknown> implements OnChanges {
	#luClass = inject(LuClass);

	@Input({ required: true })
	value: T;

	@Input({ transform: booleanAttribute })
	disabled: boolean;

	@Input()
	inlineMessage: string;

	#parentGroup = inject(RADIO_GROUP_INSTANCE);

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
			[`mod-${this.#parentGroup.size}`]: true,
		});
	}
}
