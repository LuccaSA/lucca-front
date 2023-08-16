import { NgModule } from '@angular/core';
import { LuUserSelectInputModule } from './input/index';
import { LuUserSearcherModule } from './searcher/index';
import { LuUserHomonymsModule } from './homonyms/index';
import { LuUserMeOptionModule } from './me/index';

@NgModule({
	imports: [LuUserSelectInputModule, LuUserSearcherModule, LuUserHomonymsModule, LuUserMeOptionModule],
	exports: [LuUserSelectInputModule, LuUserSearcherModule, LuUserHomonymsModule, LuUserMeOptionModule],
})
export class LuUserSelectModule {}
