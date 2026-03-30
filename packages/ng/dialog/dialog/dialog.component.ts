import { AfterViewInit, booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, ViewEncapsulation } from '@angular/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { DialogFancyIllustration } from '../dialog-type';
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
		'[style.--components-dialog-inside-backgroundImage]': 'foregroundImage()',
	},
})
export class DialogComponent implements AfterViewInit {
	public readonly dialogRef = inject<LuDialogRef>(LuDialogRef);

	readonly stacked = input(false, { transform: booleanAttribute });
	readonly fancyIllustration = input<DialogFancyIllustration>('welcome');
	readonly fancyIllustrationUrl = input<string | null>(null);

	readonly domain = 'https://cdn.lucca.fr';
	readonly path = '/transverse/prisme/visuals/fancy-dialog/';
	readonly prefix = 'foreground-';
	readonly extension = '.svg';

	readonly foregroundImage = computed<string | null>(() => {
		if (this.dialogRef.config.mode !== 'fancy') {
			return null;
		}

		if (this.fancyIllustrationUrl()) {
			return `url('${this.fancyIllustrationUrl()}')`;
		} else {
			return `url('${this.domain}${this.path}${this.prefix}${this.fancyIllustration()}${this.extension}')`;
		}
	});

	#htmlElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

	close(): void {
		this.dialogRef.close();
	}

	dismiss(): void {
		this.dialogRef.dismiss();
	}

	ngAfterViewInit(): void {
		if (this.stacked()) {
			this.dialogRef.cdkRef.overlayRef.backdropElement?.parentElement?.classList.add('mod-stacked');
		}

		if (this.dialogRef.config.autoFocus === 'first-input' && !this.dialogRef.config.cdkConfigOverride?.autoFocus) {
			const focusable: HTMLElement =
				this.#htmlElement.querySelector('.luDialog-autofocus .luNativeInput') || this.#htmlElement.querySelector('.luDialog-autofocus') || this.#htmlElement.querySelector('.luNativeInput');
			focusable?.focus();
		}
	}
}
