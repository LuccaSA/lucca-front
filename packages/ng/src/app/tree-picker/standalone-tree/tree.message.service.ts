import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { TreeNode } from './tree.class';

/** Class used to exchange notification messages between the internal components of the `lu-tree` component */
export class TreePickerMessage {
	/** The node which was modified */
	public readonly node: TreeNode;
	/** The Id of the `lu-tree-item` component which sent this message */
	public readonly senderId: string;

	constructor(node: TreeNode, senderId: string) {
		this.node = node;
		this.senderId = senderId;
	}
}

/**
 * Service used to allow communication between the internal components of the lu-tree.
 * This service is not injectable: each treepicker must have its own instance
 * of the TreePickerMessageService class
 */
export class TreePickerMessageService {
	private _subject = new Subject<TreePickerMessage>();

	public notifyNodeChanged(message: TreePickerMessage) {
		this._subject.next(message);
	}

	public onNodeChanged(): Observable<TreePickerMessage> {
		return this._subject.asObservable();
	}
}
