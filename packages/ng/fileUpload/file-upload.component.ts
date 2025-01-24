import { booleanAttribute, Component, HostBinding, inject, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';

let nextId = 0;

@Component({
	selector: 'lu-file-upload',
	standalone: true,
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe],
	providers: [LuClass],
	host: {
		class: 'fileUpload',
	},
})
export class FileUploadComponent implements OnChanges {
	#luClass = inject(LuClass);

	@Input({
		transform: booleanAttribute,
	})
	@HostBinding('class.is-droppable')
	droppable = false;

	@Input({
		transform: booleanAttribute,
	})
	multiple = false;

	@Input()
	state?: 'loading' | 'critical' | 'success';

	@Input()
	size?: 'XS' | 'S';

	ngOnChanges(): void {
		this.#luClass.setState({ [`is-${this.state}`]: !!this.state, [`mod-${this.size}`]: !!this.size });
	}

	idSuffix = nextId++;
}
