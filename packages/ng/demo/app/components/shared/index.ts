import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ExampleBoxComponent } from './example-box/example-box.component'
import { DemoApiDocs, DemoApiDocsClass, DemoApiDocsConfig } from './api-docs'

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ExampleBoxComponent,
    DemoApiDocs,
    DemoApiDocsClass,
    DemoApiDocsConfig,
  ],
  exports: [
    ExampleBoxComponent,
    DemoApiDocs,
    DemoApiDocsClass,
    DemoApiDocsConfig,
  ],
})
export class SharedModule { }

export { ExampleBoxComponent } from './example-box/example-box.component'
export { DemoApiDocs, DemoApiDocsClass, DemoApiDocsConfig } from './api-docs'
