import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule, Provider } from '@angular/core';
import { LuModalRefFactory } from './modal-ref.factory';
import { LuModal } from './modal.service';
import { LU_MODAL_REF_FACTORY } from './modal.token';

/**
 * Provide LuModal.
 * Note that OverlayModule should be imported in one of the EnvironmentInjectors (AppModule, lazy-loaded route) using `providers: [importProvidersFrom(OverlayModule)]`.
 */
export function provideLuModal(): Provider[] {
	return [LuModal, { provide: LU_MODAL_REF_FACTORY, useClass: LuModalRefFactory }];
}

@NgModule({
	imports: [OverlayModule],
	providers: [provideLuModal()],
})
export class LuModalModule {}
