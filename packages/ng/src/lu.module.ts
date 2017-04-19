import {NgModule} from '@angular/core';

import {BogusComponent} from './bogus';

@NgModule({
	declarations: [
		BogusComponent,
	],
	exports: [
		BogusComponent,
	],
})
export class LuRootModule { }