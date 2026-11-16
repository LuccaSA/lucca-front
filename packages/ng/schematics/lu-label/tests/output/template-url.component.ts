import { Component } from '@angular/core';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { TagComponent } from '@lucca-front/ng/tag';

@Component({
	selector: 'app-template-url',
	imports: [NumericBadgeComponent, TagComponent],
	templateUrl: './template-url.component.html',
})
export class TemplateUrlComponent {}
