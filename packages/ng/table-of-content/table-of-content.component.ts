import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChildren, ViewEncapsulation } from '@angular/core';
import { TableOfContentLinkDirective } from './table-of-content-link.directive';

@Component({
	selector: 'lu-table-of-content',
	templateUrl: './table-of-content.component.html',
	styleUrl: './table-of-content.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'tableOfContent',
		role: 'navigation',
	},
})
export class TableOfContentComponent {
	readonly links = contentChildren(TableOfContentLinkDirective);
}
