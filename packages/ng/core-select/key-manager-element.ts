import { Highlightable } from '@angular/cdk/a11y';

export interface KeyManagerElement<T> extends Highlightable {
	id: string;
	option?: T;
	toggleActive?(): void;
}
