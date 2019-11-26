import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DateMinmaxComponent } from './date-minmax.component';



@NgModule({
	declarations: [
		DateMinmaxComponent,
	],
	imports: [

		RouterModule.forChild([
			{ path: '', component: DateMinmaxComponent },
		]),
	],
})
export class DateMinmaxModule {}
