import { NgClass, UpperCasePipe } from '@angular/common';
import { booleanAttribute, Component, computed, inject, input, LOCALE_ID, output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { formatSize } from '../formatter';

@Component({
	selector: 'lu-file-uploaded',
	standalone: true,
	templateUrl: './file-uploaded.component.html',
	styleUrls: ['./file-uploaded.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, UpperCasePipe, LuTooltipModule, ButtonComponent, InlineMessageComponent, DividerComponent, NgClass, FormFieldComponent, TextInputComponent, FormsModule],
	host: {
		class: 'u-displayContents',
	},
})
export class FileUploadedComponent {
	#locale = inject(LOCALE_ID);

	state = input<'success' | 'loading' | 'error' | null>(null);

	inlineMessageError = input<string | null>(null);

	format = input<'file' | 'word' | 'excel' | 'powerpoint'>('file');

	size = input<'S' | null>(null);

	downloadable = input<boolean, boolean>(false, { transform: booleanAttribute });
	deletable = input<boolean, boolean>(false, { transform: booleanAttribute });
	viewable = input<boolean, boolean>(false, { transform: booleanAttribute });

	withPassword = input<boolean, boolean>(false, { transform: booleanAttribute });

	display = input<'media' | 'single' | null>(null);

	fileName = input.required<string>();
	fileType = input.required<string>();
	fileSize = input.required<number>();
	filePreviewUrl = input<string | null>(null);

	deleteFile = output();

	fileSizeDisplay = computed(() => formatSize(this.#locale, this.fileSize()));

	dlClasses = computed(() => {
		return {
			[`is-${this.state()}`]: !!this.state(),
			[`mod-${this.size()}`]: !!this.size(),
			[`mod-${this.format()}`]: !!this.format(),
			'mod-media': this.display() === 'media',
			'mod-single': this.display() === 'single',
		};
	});

	passwordControl: FormControl;
}
