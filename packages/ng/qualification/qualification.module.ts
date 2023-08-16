import { NgModule } from '@angular/core';
import { LuQualificationSelectModule } from './select/qualification-select.module';

@NgModule({
	imports: [LuQualificationSelectModule],
	exports: [LuQualificationSelectModule],
})
export class LuQualificationModule {}
