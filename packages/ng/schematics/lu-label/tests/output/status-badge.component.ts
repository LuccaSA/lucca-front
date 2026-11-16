import { Component } from '@angular/core';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';

@Component({
	selector: 'app-status-badge',
	imports: [StatusBadgeComponent],
	template: `
		<lu-status-badge label="{{ request.status }}" palette="success" />
		<lu-status-badge label="{{ advanceRequest.approvalState?.name }}" [palette]="advanceRequest.approvalState?.name === ApprovalState.Denied ? 'error' : 'product'" />
		<lu-status-badge label="{{ item.state }}" palette="error" />
	`,
})
export class StatusCasesComponent {}
