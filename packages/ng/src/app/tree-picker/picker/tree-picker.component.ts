import { Component, Input, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { LuTreeComponent, ITree, ITreeNode } from './../standalone-tree';
import { TreeNode } from '../standalone-tree/tree.class';

@Component({
	selector: 'lu-tree-picker',
	templateUrl: './tree-picker.component.html',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LuTreePickerComponent), multi: true },
	],
	styleUrls: ['./tree-picker.component.scss'],
})
export class LuTreePickerComponent implements ControlValueAccessor, OnInit, OnChanges {
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

	private _innerValue: ITreeNode | ITreeNode[];
	public get value(): ITreeNode | ITreeNode[] { return this._innerValue; }
	public set value(value: ITreeNode | ITreeNode[]) {
		if (value === this._innerValue) {
			return;
		}
		this._innerValue = value;
		this.onChangeCallback(this._innerValue);
	}

	public writeValue(value: ITreeNode | ITreeNode[]): void {
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
			this.value = this.multiple ? new Array<ITreeNode>() : new TreeNode(null);
		}
		if (this.placeholder == null) {
			this.placeholder = "";
		}
	}

	public ngOnChanges(changes: SimpleChanges) {
		if (this.multiple == null) {
			this.multiple = LuTreeComponent.DEFAULT_ALLOW_MULTIPLE;
		}
		if (this.placeholder == null) {
			this.placeholder = "";
		}
	}
}
