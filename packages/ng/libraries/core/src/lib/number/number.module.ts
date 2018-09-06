import { NgModule } from '@angular/core';
import { LuNumberPipe } from './number.pipe';

@NgModule({
	declarations: [LuNumberPipe],
	exports: [LuNumberPipe],
})
export class LuNumberModule {}
