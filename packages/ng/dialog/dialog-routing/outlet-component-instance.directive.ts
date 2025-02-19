import { NgComponentOutlet } from '@angular/common';
import { Directive, OnInit, inject, output } from '@angular/core';

@Directive({
	selector: '[luOutletComponentInstance]',
	standalone: true,
})
export class OutletComponentInstanceDirective<C> implements OnInit {
	// TODO add a generic type to NgComponentOutlet<C> when Angular 19.0 support is dropped
	#outlet = inject<NgComponentOutlet>(NgComponentOutlet);

	instanceCreated = output<C>();

	ngOnInit(): void {
		// TODO use this.#outlet.componentInstance when Angular 19.0 support is dropped
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
		const instance = (this.#outlet as any)._componentRef?.instance ?? null;

		if (instance) {
			this.instanceCreated.emit(instance as C); // TODO remove cast when Angular 19.0 support is dropped
		}
	}
}
