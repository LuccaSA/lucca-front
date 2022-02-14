import { NgModule } from '@angular/core';
import { LuOptionItemModule } from './item/index';
import { LuOptionPickerModule } from './picker/index';
import { LuOptionOperatorModule } from './operator/index';
import { LuOptionSelectorModule } from './selector/index';
import { LuOptionPlaceholderModule } from './placeholder/index';

@NgModule({
	imports: [LuOptionItemModule, LuOptionPickerModule, LuOptionOperatorModule, LuOptionSelectorModule, LuOptionPlaceholderModule],
	exports: [LuOptionItemModule, LuOptionPickerModule, LuOptionOperatorModule, LuOptionSelectorModule, LuOptionPlaceholderModule],
})
export class LuOptionModule {}
