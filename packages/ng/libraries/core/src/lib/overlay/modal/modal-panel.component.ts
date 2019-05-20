import { Component, ViewChild, ComponentRef, OnDestroy } from '@angular/core';
import { PortalOutlet, CdkPortalOutlet, Portal } from '@angular/cdk/portal';
import { ILuModalContent } from './modal.model';
import { ALuModalRef } from './modal-ref.model';
import { LuModalIntl } from './modal.intl';


@Component({
	selector: 'lu-modal-panel',
	templateUrl: './modal-panel.component.html',
	styleUrls: ['./modal-panel.component.scss']
})
export class LuModalPanelComponent<T extends ILuModalContent = ILuModalContent> implements PortalOutlet, OnDestroy {
	@ViewChild('outlet', { read: CdkPortalOutlet }) protected _outlet: PortalOutlet;
	protected _componentInstance: T;
	get title() {
		return this._componentInstance.title;
	}
	constructor(
		protected _ref: ALuModalRef<LuModalPanelComponent>,
		public intl: LuModalIntl,
	) {}
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
	dismiss() {
		this._ref.close();
	}
}
