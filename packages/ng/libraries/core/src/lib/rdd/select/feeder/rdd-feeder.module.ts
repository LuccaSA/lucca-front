import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RDDApiFeederComponent } from './rdd-feeder.component';

@NgModule({
	imports: [HttpClientModule],
	declarations: [RDDApiFeederComponent],
	exports: [RDDApiFeederComponent],
})
export class LuRddFeederModule {}
