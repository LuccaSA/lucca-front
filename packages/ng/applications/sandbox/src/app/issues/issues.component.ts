import { Component, InjectionToken, Inject } from '@angular/core';

export const ISSUES_INDEX_TOKEN = new InjectionToken('issues index');

@Component({
	selector: 'lu-issues',
	template: `<ul>
		<li *ngFor="let issue of issues"><a [routerLink]="[issue]">{{issue}}</a></li>
	</ul>`
})
export class IssuesComponent {
	constructor(@Inject(ISSUES_INDEX_TOKEN) public issues) {}
}
