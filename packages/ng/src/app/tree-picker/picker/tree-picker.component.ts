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

	@Input()
	public sourceTree: ITree;
	@Input()
	public multiple: boolean;
	@Input()
	public placeholder: string;

	public value: any;

	public writeValue(value: ITreeNode[]): void {
		this.value = this;
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
			this.value = <ITreeNode | ITreeNode[]>(this.multiple ? [] : {});
		}
		if (this.placeholder == null) {
			this.placeholder = this.multiple ? LuTreePickerComponent.DEFAULT_PLACEHOLDER_MULTIPLE : LuTreePickerComponent.DEFAULT_PLACEHOLDER;
		}
	}

	public ngOnChanges() {
		if (this.multiple == null) {
			this.multiple = LuTreeComponent.DEFAULT_ALLOW_MULTIPLE;
		}
		if (this.placeholder == null) {
			this.placeholder = this.multiple ? LuTreePickerComponent.DEFAULT_PLACEHOLDER_MULTIPLE : LuTreePickerComponent.DEFAULT_PLACEHOLDER;
		}
	}
}
