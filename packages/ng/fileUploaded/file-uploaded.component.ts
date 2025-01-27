import { Component, inject, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';

let nextId = 0;

@Component({
	selector: 'lu-file-uploaded',
	standalone: true,
	templateUrl: './file-uploaded.component.html',
	styleUrls: ['./file-uploaded.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe],
	providers: [LuClass],
	host: {
		class: 'fileUploaded',
	},
})
export class FileUploadedComponent implements OnChanges {
	#luClass = inject(LuClass);

	@Input()
	state?: 'loading' | 'critical' | 'success';

	@Input()
	size?: 'S' | 'L';

	ngOnChanges(): void {
		this.#luClass.setState({ [`is-${this.state}`]: !!this.state, [`mod-${this.size}`]: !!this.size });
	}

	idSuffix = nextId++;
}
