import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, forwardRef, inject, ViewEncapsulation } from '@angular/core';
import { LuDialogRef } from '../model';
import { LU_DIALOG_INSTANCE } from './dialog.token';

@Component({
	selector: 'lu-dialog',
	standalone: true,
	template: '<ng-content />',
	styleUrl: './dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dialog-inside',
	},
	providers: [
		{
			provide: LU_DIALOG_INSTANCE,
			useExisting: forwardRef(() => DialogComponent),
		},
	],
})
export class DialogComponent implements AfterViewInit {
	public readonly dialogRef = inject<LuDialogRef>(LuDialogRef);

	#htmlElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

	close(): void {
		this.dialogRef.close();
	}

	dismiss(): void {
		this.dialogRef.dismiss();
	}

	ngAfterViewInit(): void {
		if (this.dialogRef.config.autoFocus === 'first-input' && !this.dialogRef.config.cdkConfigOverride?.autoFocus) {
			const focusable: HTMLElement =
				this.#htmlElement.querySelector('.luDialog-autofocus .luNativeInput') || this.#htmlElement.querySelector('.luDialog-autofocus') || this.#htmlElement.querySelector('.luNativeInput');
			focusable?.focus();
		}
	}

	// dialogClass = this.dialogRef.cdkRef.overlayRef.getConfig().panelClass;

	updateMod(size: 'XS' | 'S' | '' | 'L' | 'XL' | 'XXL' | 'fitContent' | 'maxContent' | 'fullScreen') {
		this.dialogRef.cdkRef.overlayRef.removePanelClass('mod-XS');
		this.dialogRef.cdkRef.overlayRef.removePanelClass('mod-S');
		this.dialogRef.cdkRef.overlayRef.removePanelClass('mod-L');
		this.dialogRef.cdkRef.overlayRef.removePanelClass('mod-XL');
		this.dialogRef.cdkRef.overlayRef.removePanelClass('mod-XXL');
		this.dialogRef.cdkRef.overlayRef.removePanelClass('mod-fitContent');
		this.dialogRef.cdkRef.overlayRef.removePanelClass('mod-maxContent');
		this.dialogRef.cdkRef.overlayRef.removePanelClass('mod-fullScreen');

		this.dialogRef.cdkRef.overlayRef.addPanelClass(`mod-${size}`);
	}
}
