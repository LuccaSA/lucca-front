import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { LuUserModule } from '@lucca-front/ng/user';
import { UserSelectHomonymsComponent } from './user-select-homonyms.component';

// needed to reroute api calls to prisme-proxy
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RedirectModule } from '../../redirect';

@NgModule({
	declarations: [UserSelectHomonymsComponent],
	imports: [FormsModule, CommonModule, LuUserModule, HttpClientModule, RedirectModule, RouterModule.forChild([{ path: '', component: UserSelectHomonymsComponent }])],
})
export class UserSelectHomonymsModule {}
