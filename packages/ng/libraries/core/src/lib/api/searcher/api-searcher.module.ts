import { NgModule } from '@angular/core';
import { LuApiSearcherComponent } from './api-searcher.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		HttpClientModule,
		FormsModule,
	],
	declarations: [
		LuApiSearcherComponent,
	],
	exports: [
		LuApiSearcherComponent,
	],
})
export class LuApiSearcherModule {}
