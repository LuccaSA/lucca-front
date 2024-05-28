import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule, Provider } from '@angular/core';
import { LuModalRefFactory } from './modal-ref.factory';
import { LuModal } from './modal.service';
import { LU_MODAL_REF_FACTORY } from './modal.token';
import { LuDialogService } from '@lucca-front/ng/dialog';
import { DialogModule } from '@angular/cdk/dialog';

/**
 * Provide LuModal.
 * Note that OverlayModule should be imported in one of the EnvironmentInjectors (AppModule, lazy-loaded route) using `providers: [importProvidersFrom(OverlayModule)]`.
 */
export function provideLuModal(): Provider[] {
	return [LuModal, { provide: LU_MODAL_REF_FACTORY, useClass: LuModalRefFactory }, LuDialogService];
}

@NgModule({
	imports: [OverlayModule, DialogModule],
	providers: [provideLuModal(), LuDialogService],
})
export class LuModalModule {}
