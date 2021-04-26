import { NgModule } from '@angular/core';
// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { RouterModule } from '@angular/router';
import { OptionComparerComponent } from './option-comparer.component';
import { LuApiModule } from '@lucca-front/ng/api';
import { LuUserModule } from '@lucca-front/ng/user';
import { LuDepartmentModule } from '@lucca-front/ng/department';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
	declarations: [
		OptionComparerComponent,
	],
	imports: [
		LuApiModule,
		LuUserModule,
		LuDepartmentModule,
		FormsModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: OptionComparerComponent },
		]),
		HttpClientModule,
		RedirectModule,
	],
})
export class OptionComparerModule {}
