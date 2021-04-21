import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuUserDisplayModule } from '../display/index';
import { LuUserPictureComponent } from './user-picture.component';

@NgModule({
	imports: [CommonModule, LuUserDisplayModule],
	declarations: [LuUserPictureComponent],
	exports: [LuUserPictureComponent],
})
export class LuUserPictureModule {}
