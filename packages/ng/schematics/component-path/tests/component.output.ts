import { Component } from '@angular/core';
import { ScrollBoxComponent } from '@lucca-front/ng/scroll-box';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<span class="u-mask"></span>
	`,
	imports: [
		ScrollBoxComponent,
	]
})
export class SimpleCasesComponent {
}
