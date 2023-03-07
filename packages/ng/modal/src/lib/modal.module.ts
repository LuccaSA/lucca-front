import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { LuModalRefFactory } from './modal-ref.factory';
import { LuModal } from './modal.service';
import { LU_MODAL_REF_FACTORY } from './modal.token';

@NgModule({
	imports: [OverlayModule],
	providers: [LuModal, { provide: LU_MODAL_REF_FACTORY, useClass: LuModalRefFactory }],
})
export class LuModalModule {}
