import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoUserPictureComponent } from './user-picture.component';
import { LuUserPictureModule } from '@lucca-front/ng';
import { SharedModule } from '../../shared';
import { DemoUserPictureBasicComponent } from './basic/basic';

@NgModule({
	imports: [CommonModule, LuUserPictureModule, SharedModule],
	declarations: [DemoUserPictureComponent, DemoUserPictureBasicComponent],
	exports: [DemoUserPictureComponent, DemoUserPictureBasicComponent],
})
export class DemoUserPictureModule {}
