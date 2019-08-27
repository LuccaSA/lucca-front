import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LuUserHomonymsComponent } from './user-homonyms.component';

@NgModule({
	imports: [
		HttpClientModule,
	],
	declarations: [
		LuUserHomonymsComponent,
	],
	exports: [
		LuUserHomonymsComponent,
	],
})
export class LuUserHomonymsModule {}
