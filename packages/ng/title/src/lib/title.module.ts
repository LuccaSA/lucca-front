import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LuTitleService } from './title.service';

@NgModule({
	imports: [RouterModule],
	providers: [LuTitleService],
})
export class LuTitleModule {}
