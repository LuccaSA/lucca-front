import { Component, Input, Output } from '@angular/core';
import { NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core/src/view/provider';
import { OnInit, OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

import { Tree, TreeNode } from './../tree.class';
import { TreePickerMessageService, TreePickerMessage } from './../tree.message.service';
import { LuTreeComponent } from './../tree.component';

@Component({
	selector: 'lu-tree-item',
	templateUrl: './tree-item.component.html',
	styleUrls: ['./tree-item.component.scss']
})
export class LuTreeItemComponent implements OnInit, OnChanges {

	@Input()
	public tree: Tree;
	@Input()
	public multiple: boolean;
	@Input()
	public messenger: TreePickerMessageService;

	private static _uniqueIdsCount = 0;

	private readonly _nodeUniqueId: string = `tree-node-${(++LuTreeItemComponent._uniqueIdsCount)}`;
	/** Unique identifyer for this TreePickerItem */
	public get nodeUniqueId(): string { return this._nodeUniqueId; }

	constructor() { }

	public ngOnInit() {
		if (this.multiple == null) {
			this.multiple = LuTreeComponent.DEFAULT_ALLOW_MULTIPLE;
		}
	}

	public ngOnChanges(changes: SimpleChanges) {
		if (changes.hasOwnProperty('messenger') && changes.messenger != null) {
			this.messenger.onNodeChanged().subscribe(modifiedNode => this.onNodeChanged(modifiedNode));
		}
		if (this.multiple == null) {
			this.multiple = LuTreeComponent.DEFAULT_ALLOW_MULTIPLE;
		}
	}

	private onNodeChanged(message: TreePickerMessage): void {
		if (message.senderId === this.nodeUniqueId) {
			return;
		}
		// Single
		if (!this.multiple && message.node.isSelected && this.tree.node.isSelected) {
			this.tree.node.isSelected = false;
		}
	}

	public onChecked(tree: Tree, value: boolean = null) {
		// Multi value
		if (this.multiple) {
			const shouldNotify = value == null || (value !== tree.node.isSelected);
			tree.node.isSelected = value != null ? value : !tree.node.isSelected;
			if (shouldNotify) {
				this.messenger.notifyNodeChanged(new TreePickerMessage(tree.node, this.nodeUniqueId));
			}
			tree.children.forEach(item => this.onChecked(item, this.multiple ? tree.node.isSelected : false));
			return;
		}

		// Mono value
		tree.node.isSelected = value != null ? value : !tree.node.isSelected;
		this.messenger.notifyNodeChanged(new TreePickerMessage(tree.node, this.nodeUniqueId));
	}

	public onCheckParentOnly(): void {
		this.tree.node.isSelected = !this.tree.node.isSelected;
		this.messenger.notifyNodeChanged(new TreePickerMessage(this.tree.node, this.nodeUniqueId));
	}
}
