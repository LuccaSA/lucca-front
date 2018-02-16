import { Component, Input, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnInit, OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { LuTreeComponent, ITree, ITreeNode } from './../standalone-tree';

@Component({
	selector: 'lu-tree-picker',
	templateUrl: './tree-picker.component.html',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LuTreePickerComponent), multi: true },
	],
	styleUrls: ['./tree-picker.component.scss'],
})
export class LuTreePickerComponent implements ControlValueAccessor, OnInit, OnChanges {

	/** Default value for 'placeholder' attribute */
	private static readonly DEFAULT_PLACEHOLDER = 'Item';
	/** Default value for 'placeholder' attribute when 'multiple' attribute is set to true */
	private static readonly DEFAULT_PLACEHOLDER_MULTIPLE = 'Items';

	/** The tree to display */
	@Input()
	public sourceTree: ITree;
	/** Allow selection of multiple node or not */
	@Input()
	public multiple: boolean;
	/** The placeholder of the component, displayed when:
	 * - No value is selected
	 * - A value is selected and `multiple` is set to true
	 */
	@Input()
	public placeholder: string;

	public _innerValue: any;
	public get value(): any { return this._innerValue; }
	public set value(value: any) {
		if (value === this._innerValue) {
			return;
		}
		this._innerValue = value;
		this.onChangeCallback(this._innerValue);
	}

	public writeValue(value: ITreeNode[]): void {
		this.value = value;
	}

	public onChangeCallback: (_: any) => void = () => { };
	public registerOnChange(methodToCall: (_: any) => void): void {
		this.onChangeCallback = methodToCall;
	}

	private onTouchedCallback: (_: any) => void = () => { };
	public registerOnTouched(methodToCall: (_: any) => void): void {
		this.onTouchedCallback = methodToCall;
	}

	public ngOnInit() {
		if (this.multiple == null) {
			this.multiple = LuTreeComponent.DEFAULT_ALLOW_MULTIPLE;
		}
		if (this.value == null) {
			this.value = this.multiple ? [] : {};
		}
		if (this.placeholder == null) {
			this.placeholder = this.multiple ? LuTreePickerComponent.DEFAULT_PLACEHOLDER_MULTIPLE : LuTreePickerComponent.DEFAULT_PLACEHOLDER;
		}
	}

	public ngOnChanges(changes: SimpleChanges) {
		if (this.multiple == null) {
			this.multiple = LuTreeComponent.DEFAULT_ALLOW_MULTIPLE;
		}
		if (this.placeholder == null) {
			this.placeholder = this.multiple ? LuTreePickerComponent.DEFAULT_PLACEHOLDER_MULTIPLE : LuTreePickerComponent.DEFAULT_PLACEHOLDER;
		}
	}
}
