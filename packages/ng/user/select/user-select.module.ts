import { NgModule } from '@angular/core';
import { LuUserHomonymsComponent } from './homonyms/index';
import { LuUserSelectInputModule } from './input/index';
import { LuUserMeOptionModule } from './me/index';
import { LuUserSearcherModule } from './searcher/index';

/**
 * @deprecated prefer SimpleSelect or MultipleSelect with luCustomUsers directive
 */
@NgModule({
	imports: [LuUserSelectInputModule, LuUserSearcherModule, LuUserHomonymsComponent, LuUserMeOptionModule],
	exports: [LuUserSelectInputModule, LuUserSearcherModule, LuUserHomonymsComponent, LuUserMeOptionModule],
})
export class LuUserSelectModule {}
