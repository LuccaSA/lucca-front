import { TitleCasePipe } from '@angular/common';
import { booleanAttribute, Component, computed, inject, input, Input, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuClass } from '@lucca-front/ng/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { FileUploadedComponent } from './fileUploaded/file-uploaded.component';
import { formatSize, MEGA_BYTE } from './formatter';

let nextId = 0;

@Component({
	selector: 'lu-file-upload',
	standalone: true,
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe, InputDirective, ButtonComponent, IconComponent, LuTooltipModule, FileUploadedComponent, TitleCasePipe],
	providers: [LuClass],
	host: { class: 'fileUpload-wrapper' },
})
export class FileUploadComponent {
	#locale = inject(LOCALE_ID);

	idSuffix = nextId++;

	droppable = false;

	files: File[] = [];

	@Input({
		transform: booleanAttribute,
	})
	multiple = false;

	state = input<null | 'loading' | 'critical'>(null);

	accept = input<
		Array<{
			format: string;
			name?: string;
		}>
	>([]);

	acceptNames = computed(() =>
		this.accept()
			.filter((e) => e.name)
			.map((e) => e.name),
	);

	acceptAttribute = computed(() => this.accept().map((e) => e.format));

	// TODO: Check base max weight in Lucca Files
	fileMaxSize = input<number>(80 * MEGA_BYTE);

	// TODO this is filled by the consumer to decide if we want to display image preview when possible.
	disablePreview = input(false, { transform: booleanAttribute });

	bitmapPreviews: string[] = [];

	maxSizeDisplay = computed(() => formatSize(this.#locale, this.fileMaxSize()));

	size = input<'S' | 'M'>('M');

	typeMedia = input<boolean, boolean>(false, { transform: booleanAttribute });

	illustration = computed(() => {
		if (this.typeMedia()) {
			return 'https://cdn.lucca.fr/transverse/prisme/visuals/empty-states/icons/iconPictureAction.svg';
		} else {
			return 'https://cdn.lucca.fr/transverse/prisme/visuals/empty-states/icons/iconPaperAction.svg';
		}
	});

	filesChange(event: Event) {
		// TODO loading state
		const host = event.target as HTMLInputElement;

		this.droppable = false;
		this.files = Array.from(host.files);

		if (!this.disablePreview()) {
			this.bitmapPreviews = this.files.map((file) => URL.createObjectURL(file));
		}
	}

	abort(input: HTMLInputElement) {
		input.value = null;

		this.bitmapPreviews = [];
		this.files = [];
		this.state = null;
	}
}
