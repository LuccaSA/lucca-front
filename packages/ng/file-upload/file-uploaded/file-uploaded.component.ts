import { UpperCasePipe } from '@angular/common';
import { booleanAttribute, Component, computed, effect, HostBinding, inject, input, LOCALE_ID, output, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuClass } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { formatSize } from '../formatter';

@Component({
	selector: 'lu-file-uploaded',
	standalone: true,
	templateUrl: './file-uploaded.component.html',
	styleUrls: ['./file-uploaded.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, UpperCasePipe, LuTooltipModule, ButtonComponent],
	providers: [LuClass],
	host: {
		class: 'fileUploaded',
	},
})
export class FileUploadedComponent {
	#luClass = inject(LuClass);
	#locale = inject(LOCALE_ID);

	state = input<'loading' | 'critical' | 'success'>('loading');

	format = input<'file' | 'word' | 'excel' | 'powerpoint'>('file');

	size = input<'S' | 'M'>('M');

	downloadable = input<boolean, boolean>(false, { transform: booleanAttribute });

	deletable = input<boolean, boolean>(false, { transform: booleanAttribute });

	typeMedia = input<boolean, boolean>(false, { transform: booleanAttribute });

	@HostBinding('class.mod-media')
	get typeMediaAttr() {
		return this.typeMedia();
	}

	fileName = input.required<string>();
	fileType = input.required<string>();
	fileSize = input.required<number>();
	fileUrl = input<string | null>(null);
	filePreviewUrl = input<string | null>(null);

	deleteFile = output();

	fileSizeDisplay = computed(() => formatSize(this.#locale, this.fileSize()));

	constructor() {
		effect(() => {
			this.#luClass.setState({ [`is-${this.state()}`]: !!this.state(), [`mod-${this.size()}`]: !!this.size(), [`mod-${this.format()}`]: !!this.format() });
		});
	}
}
