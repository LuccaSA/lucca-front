import { booleanAttribute, Component, computed, HostBinding, inject, input, Input, LOCALE_ID, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';

let nextId = 0;
const KILO_BYTE = 1000;
const MEGA_BYTE = KILO_BYTE * 1000;
const GIGA_BYTE = MEGA_BYTE * 1000;

@Component({
	selector: 'lu-file-upload',
	standalone: true,
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe, InputDirective],
	providers: [LuClass],
	host: {
		class: 'fileUpload',
	},
})
export class FileUploadComponent implements OnChanges {
	#luClass = inject(LuClass);
	#locale = inject(LOCALE_ID);

	idSuffix = nextId++;

	@HostBinding('class.is-droppable')
	droppable = false;

	files: File[] = [];

	@Input({
		transform: booleanAttribute,
	})
	multiple = false;

	@Input()
	state?: 'loading' | 'critical';

	accept = input<
		Array<{
			format: string;
			name?: string;
		}>
	>([]);

	listingFormatter = new Intl.ListFormat(this.#locale, {
		style: 'short',
		type: 'disjunction',
	});

	acceptNames = computed(() =>
		this.listingFormatter.format(
			this.accept()
				.filter((e) => e.name)
				.map((e) => e.name),
		),
	);

	acceptAttribute = computed(() => this.accept().map((e) => e.format));

	// TODO: Check base max weight in Lucca Files
	maxWeight = input<number>(80 * MEGA_BYTE);

	// TODO this is filled by the consumer to decide if we want to display image preview when possible.
	preview = input(true, { transform: booleanAttribute });

	bitmapPreviews: string[] = [];

	maxWeightDisplay = computed(() => {
		let unit = 'byte';
		let value = this.maxWeight();

		if (this.maxWeight() >= GIGA_BYTE) {
			unit = 'gigabyte';
			value /= GIGA_BYTE;
		} else if (this.maxWeight() >= MEGA_BYTE) {
			unit = 'megabyte';
			value /= MEGA_BYTE;
		} else if (this.maxWeight() >= KILO_BYTE) {
			unit = 'kilobyte';
			value /= KILO_BYTE;
		}

		const weightFormatter = Intl.NumberFormat(this.#locale, {
			notation: 'compact',
			style: 'unit',
			unit: unit,
			unitDisplay: 'narrow',
		});

		return weightFormatter.format(value);
	});

	small = input<boolean, boolean>(false, { transform: booleanAttribute });

	@HostBinding('class.mod-S')
	get isSmall() {
		return this.small();
	}

	filesChange(event: Event) {
		this.droppable = false;
		const host = event.target as HTMLInputElement;
		this.state = 'loading';
		if (this.preview()) {
			this.bitmapPreviews = [URL.createObjectURL(host.files[0])];
		}
	}

	ngOnChanges(): void {
		this.#luClass.setState({ [`is-${this.state}`]: !!this.state });
	}
}
