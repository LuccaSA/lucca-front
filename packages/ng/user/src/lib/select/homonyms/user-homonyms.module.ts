import { NgModule } from '@angular/core';
import { LuUserDisplayModule } from '../../display/index';
import { LuUserHomonymsComponent } from './user-homonyms.component';

@NgModule({
	imports: [LuUserDisplayModule],
	declarations: [LuUserHomonymsComponent],
	exports: [LuUserHomonymsComponent],
})
export class LuUserHomonymsModule {}
