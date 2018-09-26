import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuSafeContentPipe } from './safe-content.pipe';

@NgModule({
	imports: [ CommonModule ],
	declarations: [LuSafeContentPipe],
	exports: [LuSafeContentPipe],
	providers: [LuSafeContentPipe],
})
export class LuSafeContentModule {}
