import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LuUserFeederComponent } from './user-feeder.component';
import { LuUserFeederService } from './user-feeder.service';

@NgModule({
	imports: [
		HttpClientModule,
		ReactiveFormsModule,
	],
	declarations: [
		LuUserFeederComponent,
	],
	exports: [
		LuUserFeederComponent,
	],
	providers: [
		LuUserFeederService,
	]
})
export class LuUserFeederModule {}
