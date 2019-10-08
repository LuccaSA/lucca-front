import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormlyFramedComponent } from './formly-framed.component';



@NgModule({
	declarations: [
		FormlyFramedComponent,
	],
	imports: [

		RouterModule.forChild([
			{ path: '', component: FormlyFramedComponent },
		]),
	],
})
export class FormlyFramedModule {}
