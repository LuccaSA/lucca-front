import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { OverlaysEventsComponent } from './overlays-events.component';
import { LuPopoverModule } from '@lucca-front/ng/popover';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuDropdownModule } from '@lucca-front/ng/dropdown';
import { LuDepartmentModule } from '@lucca-front/ng/department';
import { LuUserModule } from '@lucca-front/ng/user';
import { LuApiModule } from '@lucca-front/ng/api';
import { LuDateModule } from '@lucca-front/ng/date';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuInputModule } from '@lucca-front/ng/input';

import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ALuDateAdapter, LuNativeDateAdapter } from '@lucca-front/ng/core';

@NgModule({
	declarations: [
		OverlaysEventsComponent,
	],
	imports: [
		LuPopoverModule,
		LuTooltipModule,
		LuDropdownModule,
		LuDepartmentModule,
		LuUserModule,
		LuApiModule,
		LuDateModule,
		LuSelectModule,
		LuOptionModule,
		LuInputModule,

		HttpClientModule,
		RedirectModule,
		FormsModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: OverlaysEventsComponent },
		]),
	],
	providers: [
		{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter },
	]
})
export class OverlaysEventsModule {}
