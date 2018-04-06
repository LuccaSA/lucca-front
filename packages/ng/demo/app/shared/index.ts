import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleBoxComponent } from './example-box/example-box.component';
import { DemoApiDocs, DemoApiDocsClass, DemoApiDocsConfig } from './api-docs';

import { RedirectModule } from './redirect/redirect.module';

@NgModule({
	imports: [CommonModule, RedirectModule],
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
		RedirectModule,
	],
})
export class SharedModule {}

export { ExampleBoxComponent } from './example-box/example-box.component';
export { DemoApiDocs, DemoApiDocsClass, DemoApiDocsConfig } from './api-docs';
