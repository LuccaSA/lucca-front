import { NgModule } from '@angular/core';
import { LuApiFeederComponent } from './api-feeder.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [HttpClientModule],
	declarations: [LuApiFeederComponent],
	exports: [LuApiFeederComponent],
})
export class LuApiFeederModule {}
