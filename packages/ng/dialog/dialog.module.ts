import { NgModule } from '@angular/core';
import { DialogModule } from '@angular/cdk/dialog';
import { LuDialogService } from './dialog.service';

@NgModule({
	imports: [DialogModule],
	exports: [],
	providers: [LuDialogService],
})
export class LuDialogModule {}
