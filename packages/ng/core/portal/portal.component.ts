import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { PortalContent } from './portal-content';

@Component({
	selector: 'lu-portal',
	standalone: true,
	imports: [NgTemplateOutlet, NgIf],
	templateUrl: './portal.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalComponent<T = unknown> {
	@Input({
		required: true,
	})
	content!: PortalContent<T>;

	isTemplateRef(input: PortalContent<T>): input is TemplateRef<T> {
		return input instanceof TemplateRef;
	}
}
