export {BogusComponent} from './bogus.component';

import {NgModule} from '@angular/core';
import {BogusComponent} from './bogus.component';

@NgModule({
	declarations: [
	BogusComponent,
	],
	exports: [
	BogusComponent,
	],
})
export class BogusModule { }
