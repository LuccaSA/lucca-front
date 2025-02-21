import { booleanAttribute, Component, computed, inject, input, Input, LOCALE_ID, signal, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuClass } from '@lucca-front/ng/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { FileUploadedComponent } from './file-uploaded/file-uploaded.component';
import { formatSize, MEGA_BYTE } from './formatter';
import { FileUploadedEntry } from './file-uploaded-entry';

let nextId = 0;

@Component({
	selector: 'lu-file-upload',
	standalone: true,
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe, InputDirective, ButtonComponent, IconComponent, LuTooltipModule, FileUploadedComponent],
	providers: [LuClass],
	host: { class: 'fileUpload-wrapper' },
})
export class FileUploadComponent {
	#locale = inject(LOCALE_ID);

	idSuffix = nextId++;

	droppable = false;

	files: FileUploadedEntry[] = [];

	@Input({
		transform: booleanAttribute,
	})
	multiple = false;

	state = signal<null | 'loading' | 'success' | 'critical'>(null);

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

	disablePreview = input(false, { transform: booleanAttribute });

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
		const host = event.target as HTMLInputElement;
		this.droppable = false;
		const upload: FileUploadedEntry[] = Array.from(host.files).map((file) => {
			if (!this.disablePreview() && file.type.startsWith('image/')) {
				return { file, state: 'loading', preview: URL.createObjectURL(file) };
			}
			return { file, state: 'loading' };
		});
		if (!this.multiple) {
			this.state.set('loading');
			this.files = upload;
		} else {
			this.files.push(...upload);
		}
	}

	abort(input: HTMLInputElement) {
		input.value = null;

		this.files = [];
		this.state.set(null);
	}
}
