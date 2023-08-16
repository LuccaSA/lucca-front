import { NgModule } from '@angular/core';
import { LuNumberPipe } from './number.pipe';

@NgModule({
	imports: [LuNumberPipe],
	exports: [LuNumberPipe],
})
export class LuNumberModule {}
