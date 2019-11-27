import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuNumberPipe } from './number.pipe';

@NgModule({
	imports: [CommonModule],
	declarations: [LuNumberPipe],
	exports: [LuNumberPipe],
})
export class LuNumberModule {}
