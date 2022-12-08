import { NgModule } from '@angular/core';
import { LuOptionItemComponent } from './item/index';
import { LuForGroupsDirective, LuForOptionsDirective, LuOptionFeederComponent, LuOptionPagerComponent, LuOptionSearcherComponent } from './operator/index';
import { LuOptionPickerAdvancedComponent, LuOptionPickerComponent } from './picker/index';
import { LuOptionPlaceholderComponent } from './placeholder/index';
import { LuOptionSelectAllComponent } from './selector/index';

@NgModule({
	imports: [
		LuOptionItemComponent,
		LuOptionPickerComponent,
		LuOptionPickerAdvancedComponent,
		LuOptionPagerComponent,
		LuOptionFeederComponent,
		LuOptionSearcherComponent,
		LuForOptionsDirective,
		LuForGroupsDirective,
		LuOptionSelectAllComponent,
		LuOptionPlaceholderComponent,
	],
	exports: [
		LuOptionItemComponent,
		LuOptionPickerAdvancedComponent,
		LuOptionPickerComponent,
		LuOptionPagerComponent,
		LuOptionFeederComponent,
		LuOptionSearcherComponent,
		LuForOptionsDirective,
		LuForGroupsDirective,
		LuOptionSelectAllComponent,
		LuOptionPlaceholderComponent,
	],
})
export class LuOptionModule {}
