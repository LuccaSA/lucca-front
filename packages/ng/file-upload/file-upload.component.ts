import { booleanAttribute, Component, computed, inject, input, LOCALE_ID, output, signal, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuClass } from '@lucca-front/ng/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { FileUploadEntry } from './file-upload-entry';
import { formatSize, MEGA_BYTE } from './formatter';

let nextId = 0;

@Component({
	selector: 'lu-file-upload',
	standalone: true,
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe, InputDirective, ButtonComponent, IconComponent, LuTooltipModule],
	providers: [LuClass],
	host: { class: 'fileUpload-wrapper' },
})
export class FileUploadComponent {
	#locale = inject(LOCALE_ID);

	idSuffix = nextId++;

	droppable = false;

	files: FileUploadEntry[] = [];

	fileUploaded = output<File>();

	multiple = input(false, { transform: booleanAttribute });

	state = signal<'loading' | 'success' | 'error' | null>(null);

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

	fileMaxSize = input<number>(80 * MEGA_BYTE);

	disablePreview = input(false, { transform: booleanAttribute });

	maxSizeDisplay = computed(() => formatSize(this.#locale, this.fileMaxSize()));

	size = input<'S' | null>(null);

	password = input<boolean, boolean>(false, { transform: booleanAttribute });

	displayMedia = input<boolean, boolean>(false, { transform: booleanAttribute });

	illustration = input<'picture' | 'paper'>('paper');

	illustrationUrl = computed(() => {
		if (this.illustration() === 'picture') {
			return 'https://cdn.lucca.fr/transverse/prisme/visuals/empty-states/icons/iconPictureAction.svg';
		} else {
			return 'https://cdn.lucca.fr/transverse/prisme/visuals/empty-states/icons/iconPaperAction.svg';
		}
	});

	filesChange(event: Event) {
		const host = event.target as HTMLInputElement;
		this.droppable = false;
		const upload: FileUploadEntry[] = Array.from(host.files).map((file) => {
			return {
				file,
				name: file.name,
				size: file.size,
				type: file.type,
				state: 'loading',
				preview: !this.disablePreview() && file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
			};
		});
		if (!this.multiple()) {
			this.state.set('loading');
			this.files = upload;
		} else {
			this.files.push(...upload);
		}
	}

	abort(input: HTMLInputElement, index: number) {
		if (this.files.length === 1) {
			input.value = null;
			this.files = [];
			this.state.set(null);
		} else {
			// Input.files is read-only, so we need to create a new DataTransfer object
			const data = new DataTransfer();
			for (let i = 0; i < this.files.length; i++) {
				if (i !== index) {
					data.items.add(this.files[i].file);
				}
			}
			input.files = data.files;
			this.state.set(null);
			this.files.splice(index, 1);
		}
	}
}
