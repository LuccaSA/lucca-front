import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LuSidepanelModule } from '@lucca-front/ng/sidepanel';
import { PocSidepanelInsideComponent, SidepanelComponent } from './sidepanel.component';

@NgModule({
	declarations: [SidepanelComponent, PocSidepanelInsideComponent],
	entryComponents: [PocSidepanelInsideComponent],
	imports: [LuSidepanelModule, FormsModule, CommonModule, RouterModule.forChild([{ path: '', component: SidepanelComponent }])],
})
export class SidepanelModule {}
