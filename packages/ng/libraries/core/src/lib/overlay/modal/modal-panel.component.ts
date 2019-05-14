import { Component, ViewChild, ComponentRef, OnDestroy } from '@angular/core';
import { PortalOutlet, CdkPortalOutlet, Portal } from '@angular/cdk/portal';


@Component({
	selector: 'lu-modal-panel',
	templateUrl: './modal-panel.component.html',
	styleUrls: ['./modal-panel.component.scss']
})
export class LuModalPanelComponent implements PortalOutlet, OnDestroy {
	@ViewChild('outlet', { read: CdkPortalOutlet }) protected _outlet: PortalOutlet;
	attach<T>(portal: Portal<T>) {
		return this._outlet.attach(portal) as ComponentRef<T>;
	}
	detach() {
		return this._outlet.detach();
	}
	dispose() {
		return this._outlet.dispose();
	}
	hasAttached() {
		return this._outlet.hasAttached();
	}
	ngOnDestroy() {
		this.detach();
		this.dispose();
	}
}
