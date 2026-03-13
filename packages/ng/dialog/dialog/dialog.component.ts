import { AfterViewInit, booleanAttribute, ChangeDetectionStrategy, Component, ElementRef, inject, input, ViewEncapsulation } from '@angular/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { LuDialogRef } from '../model';

@Component({
	selector: 'lu-dialog',
	templateUrl: './dialog.component.html',
	styleUrl: './dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe],
	host: {
		class: 'dialog-inside',
		'[style.--components-dialog-inside-backgroundImage]': "`url('https://cdn.lucca.fr/transverse/prisme/visuals/fancy-dialog/foreground-${fancyIllustration()}.svg')`",
	},
})
export class DialogComponent implements AfterViewInit {
	public readonly dialogRef = inject<LuDialogRef>(LuDialogRef);

	readonly stacked = input(false, { transform: booleanAttribute });
	readonly fancyIllustration = input<'approval' | 'checklist' | 'email' | 'install' | 'mapping' | 'save' | 'users' | 'welcome'>('welcome');

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
