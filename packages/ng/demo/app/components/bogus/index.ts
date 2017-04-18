
import {NgModule} from '@angular/core';

import {BogusModule} from '../../../../src';
import {SharedModule} from '../shared';
import {DEMO_DIRECTIVES} from './demos';
import { DemoBogusComponent } from './bogus.component'

@NgModule({
  imports: [
    SharedModule,
    BogusModule,
  ],
  exports: [DemoBogusComponent],
  declarations: [DemoBogusComponent, ...DEMO_DIRECTIVES],
})
export class DemoBogusModule {}
