import { booleanAttribute, Component, HostBinding, inject, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';

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

	@Input()
	size?: 'XS' | 'S';

	ngOnChanges(): void {
		this.#luClass.setState({ [`mod-${this.size}`]: !!this.size });
	}
}
