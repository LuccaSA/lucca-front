import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TagComponent } from '@lucca-front/ng/tag';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';

@Component({
	selector: 'app-translate',
	imports: [TranslatePipe, TagComponent, StatusBadgeComponent],
	template: `
		<lu-tag [label]="'EXPORT_TYPE_LABEL' | translate" palette="neutral" outlined />
		<lu-status-badge [label]="'REQUEST_STATUS_APPROVED' | translate" palette="success" />
	`,
})
export class TranslateCasesComponent {}
