import { AfterViewInit, booleanAttribute, ChangeDetectionStrategy, Component, ElementRef, inject, input, ViewEncapsulation } from '@angular/core';
import { LuDialogRef } from '../model';

@Component({
	selector: 'lu-dialog',
	template: '<ng-content />',
	styleUrl: './dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dialog-inside',
	},
})
export class DialogComponent implements AfterViewInit {
	public readonly dialogRef = inject<LuDialogRef>(LuDialogRef);

	readonly stacked = input(false, { transform: booleanAttribute });

	#htmlElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

	close(): void {
		this.dialogRef.close();
	}

	dismiss(): void {
		this.dialogRef.dismiss();
	}

	ngAfterViewInit(): void {
		if (this.stacked()) {
			this.dialogRef.cdkRef.overlayRef.addPanelClass('mod-stacked');
		}

		if (this.dialogRef.config.autoFocus === 'first-input' && !this.dialogRef.config.cdkConfigOverride?.autoFocus) {
			const focusable: HTMLElement =
				this.#htmlElement.querySelector('.luDialog-autofocus .luNativeInput') || this.#htmlElement.querySelector('.luDialog-autofocus') || this.#htmlElement.querySelector('.luNativeInput');
			focusable?.focus();
		}
	}
}
