import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuSelectPanelComponent } from './panel.component';

@NgModule({
	imports: [CommonModule, FormsModule, A11yModule],
	declarations: [LuSelectPanelComponent],
	exports: [LuSelectPanelComponent],
})
export class LuSelectPanelModule {}
