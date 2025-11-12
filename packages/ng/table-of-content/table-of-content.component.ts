import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChildren, ViewEncapsulation } from '@angular/core';
import { TableOfContentLinkDirective } from './table-of-content-link.directive';

@Component({
	selector: 'lu-table-of-content',
	templateUrl: './table-of-content.component.html',
	styleUrl: './table-of-content.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet],
	host: {
		class: 'tableOfContent',
		role: 'navigation',
	},
})
export class TableOfContentComponent {
	links = contentChildren(TableOfContentLinkDirective);
}
