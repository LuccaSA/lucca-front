import { Component, ViewChild } from '@angular/core';
import { PortalOutlet, CdkPortalOutlet } from '@angular/cdk/portal';


@Component({
	selector: 'lu-modal-panel',
	templateUrl: './modal-panel.component.html',
	styleUrls: ['./modal-panel.component.scss']
})
export class LuModalPanelComponent {
	@ViewChild('outlet', { read: CdkPortalOutlet }) outlet: PortalOutlet;
}
