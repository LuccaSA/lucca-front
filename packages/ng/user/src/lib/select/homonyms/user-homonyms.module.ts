import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LuUserHomonymsComponent } from './user-homonyms.component';
import { LuUserDisplayModule } from '../../display/index';

@NgModule({
	imports: [HttpClientModule, LuUserDisplayModule],
	declarations: [LuUserHomonymsComponent],
	exports: [LuUserHomonymsComponent],
})
export class LuUserHomonymsModule {}
