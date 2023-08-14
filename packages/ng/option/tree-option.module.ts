import { NgModule } from '@angular/core';
import { LuTreeOptionItemModule } from './item/index';
import { LuTreeOptionPickerModule } from './picker/index';
import { LuTreeOptionOperatorModule } from './operator/index';
import { LuTreeOptionSelectorModule } from './selector/index';

@NgModule({
	imports: [LuTreeOptionItemModule, LuTreeOptionPickerModule, LuTreeOptionOperatorModule, LuTreeOptionSelectorModule],
	exports: [LuTreeOptionItemModule, LuTreeOptionPickerModule, LuTreeOptionOperatorModule, LuTreeOptionSelectorModule],
})
export class LuTreeOptionModule {}
