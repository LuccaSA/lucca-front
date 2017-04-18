import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ExampleBoxComponent } from './example-box/example-box.component'

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ExampleBoxComponent,
    ],
  exports: [
    ExampleBoxComponent,
  ]
})
export class SharedModule { }

export { ExampleBoxComponent } from './example-box/example-box.component'
