import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SelectOptionPlaceholderComponent } from './select-option-placeholder.component';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuInputModule } from '@lucca-front/ng/input';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { LuApiModule } from '@lucca-front/ng/api';
import { LuUserModule } from '@lucca-front/ng/user';

@NgModule({
	declarations: [
		SelectOptionPlaceholderComponent,
	],
	imports: [
		FormsModule,
		LuSelectModule,
		LuOptionModule,
		LuInputModule,
		RouterModule.forChild([
			{ path: '', component: SelectOptionPlaceholderComponent },
		]),
		HttpClientModule,
		RedirectModule,
		LuApiModule,
		LuUserModule,

	],
})
export class SelectOptionPlaceholderModule {}
