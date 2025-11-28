import { NgModule } from '@angular/core';
import { LuApiFeederComponent } from './api-feeder.component';

/**
 * @deprecated use `LuApiFeederComponent` instead
 */
@NgModule({
	imports: [LuApiFeederComponent],
	exports: [LuApiFeederComponent],
})
export class LuApiFeederModule {}
