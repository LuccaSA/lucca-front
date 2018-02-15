import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ITreeNode } from './tree.class';

export class TreePickerMessage {
	public readonly node: ITreeNode;
	public readonly senderId: string;
	constructor(node: ITreeNode, senderId: string) {
		this.node = node;
		this.senderId = senderId;
	}
}

// Not injectable: each treepicker must have its own instance of the TReePickerMessageService class
export class TreePickerMessageService {
	private _subject = new Subject<TreePickerMessage>();

	public notifyNodeChanged(message: TreePickerMessage) {
		this._subject.next(message);
	}

	public onNodeChanged(): Observable<TreePickerMessage> {
		return this._subject.asObservable();
	}
}
