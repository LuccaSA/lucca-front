import { Component } from '@angular/core';

@Component({
	selector: 'app-status-badge',
	imports: [],
	template: `
		<span class="label palette-success">{{ request.status }}</span>
		<span class="label" [class.palette-error]="advanceRequest.approvalState?.name === ApprovalState.Denied">{{ advanceRequest.approvalState?.name }}</span>
		<span class="label palette-critical"><span aria-hidden="true" class="label-icon lucca-icon icon-signError"></span>{{ item.state }}</span>
	`,
})
export class StatusCasesComponent {}
