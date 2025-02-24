import { UpperCasePipe } from '@angular/common';
import { booleanAttribute, Component, computed, effect, HostBinding, inject, input, LOCALE_ID, output, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuClass } from '@lucca-front/ng/core';
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
	imports: [IconComponent, UpperCasePipe, LuTooltipModule, ButtonComponent, InlineMessageComponent],
	providers: [LuClass],
	host: {
		class: 'fileUploaded',
	},
})
export class FileUploadedComponent {
	#luClass = inject(LuClass);
	#locale = inject(LOCALE_ID);

	state = input<'loading' | 'error' | null>(null);

	format = input<'file' | 'word' | 'excel' | 'powerpoint'>('file');

	size = input<'S' | null>(null);

	downloadable = input<boolean, boolean>(false, { transform: booleanAttribute });
	deletable = input<boolean, boolean>(false, { transform: booleanAttribute });
	viewable = input<boolean, boolean>(false, { transform: booleanAttribute });

	display = input<'media' | 'single' | null>(null);

	@HostBinding('class.mod-media')
	get displayMediaClass() {
		return this.display() === 'media';
	}

	@HostBinding('class.mod-single')
	get multipleClass() {
		return this.display() === 'single';
	}

	fileName = input.required<string>();
	fileType = input.required<string>();
	fileSize = input.required<number>();
	filePreviewUrl = input<string | null>(null);

	deleteFile = output();

	fileSizeDisplay = computed(() => formatSize(this.#locale, this.fileSize()));

	constructor() {
		effect(() => {
			this.#luClass.setState({ [`is-${this.state()}`]: !!this.state(), [`mod-${this.size()}`]: !!this.size(), [`mod-${this.format()}`]: !!this.format() });
		});
	}
}
