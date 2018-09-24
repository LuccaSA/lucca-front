import { NgModule } from '@angular/core';
import { LuNumberPipe } from './number.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [CommonModule],
	declarations: [LuNumberPipe],
	exports: [LuNumberPipe],
})
export class LuNumberModule {}
