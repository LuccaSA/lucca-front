import { NgModule } from '@angular/core';
import { LuUserDisplayPipe } from './user-display.pipe';

@NgModule({
	imports: [LuUserDisplayPipe],
	exports: [LuUserDisplayPipe],
})
export class LuUserDisplayModule {}
