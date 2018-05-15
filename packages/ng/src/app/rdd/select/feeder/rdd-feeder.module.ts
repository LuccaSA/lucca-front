import { NgModule } from '@angular/core';

import { RDDApiFeederComponent } from './rdd-feeder.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		HttpClientModule,
		CommonModule,
		FormsModule,
	],
	declarations: [RDDApiFeederComponent],
	exports: [RDDApiFeederComponent],
})
export class LuRddFeederModule {}
