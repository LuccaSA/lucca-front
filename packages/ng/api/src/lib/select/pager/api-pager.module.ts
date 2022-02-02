import { NgModule } from '@angular/core';
import { LuApiPagerComponent } from './api-pager.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [HttpClientModule],
	declarations: [LuApiPagerComponent],
	exports: [LuApiPagerComponent],
})
export class LuApiPagerModule {}
