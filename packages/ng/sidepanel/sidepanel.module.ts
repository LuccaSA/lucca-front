import { NgModule } from '@angular/core';
import { LuModalModule } from '@lucca-front/ng/modal';
import { LuSidepanel } from './sidepanel.service';

/**
 * @deprecated Use LuModal with `modal.open(component, data, { mode: 'sidepanel' })` instead.
 */
@NgModule({
	imports: [LuModalModule],
	providers: [LuSidepanel],
})
export class LuSidepanelModule {}
