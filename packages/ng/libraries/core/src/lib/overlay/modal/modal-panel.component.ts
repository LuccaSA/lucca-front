import { Component, ViewChild, ComponentRef, OnDestroy } from '@angular/core';
import { PortalOutlet, CdkPortalOutlet, Portal } from '@angular/cdk/portal';


@Component({
	selector: 'lu-modal-panel',
	templateUrl: './modal-panel.component.html',
	styleUrls: ['./modal-panel.component.scss']
})
export class LuModalPanelComponent<T = any> implements PortalOutlet, OnDestroy {
	@ViewChild('outlet', { read: CdkPortalOutlet }) protected _outlet: PortalOutlet;
	protected _componentInstance: T;
	attach<U extends T = T>(portal: Portal<U>) {
		const ref = this._outlet.attach(portal) as ComponentRef<U>;
		this._componentInstance = ref.instance;
		return ref;
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
