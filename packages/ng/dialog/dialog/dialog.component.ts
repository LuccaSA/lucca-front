import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { LuDialogRef } from '../model';

@Component({
	selector: 'lu-dialog',
	standalone: true,
	template: '<ng-content></ng-content>',
	styleUrl: './dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dialog-inside',
	},
})
export class DialogComponent implements OnInit {
	public readonly dialogRef = inject<LuDialogRef>(LuDialogRef);

	#htmlElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

	close(): void {
		this.dialogRef.close();
	}

	dismiss(): void {
		this.dialogRef.dismiss();
	}

	ngOnInit(): void {
		if (!this.dialogRef.config.cdkConfigOverride?.autoFocus) {
			const focusable: HTMLElement =
				this.#htmlElement.querySelector('.luDialog-autofocus .luNativeInput') || this.#htmlElement.querySelector('.luDialog-autofocus') || this.#htmlElement.querySelector('.luNativeInput');
			focusable?.focus();
		}
	}
}
