import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleService } from './title.service';

@NgModule({
	imports: [RouterModule],
	providers: [TitleService],
})
export class LuTitleModule {}
