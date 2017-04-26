import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuLolComponent } from './lol.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LuLolComponent]
})
export class LuLolModule { }

export { LuLolComponent } from './lol.component';
