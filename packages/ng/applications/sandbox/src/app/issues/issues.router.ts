import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PocTranslateModule } from './poc-translate';
import { RefactoOverlaysModule } from './refacto-overlays';
import { RefactoOverlaysTooltipModule } from './refacto-overlays-tooltip';
import { CommonModule } from '@angular/common';
import { IssuesComponent, ISSUES_INDEX_TOKEN } from './issues.component';

const routes: Routes = [
	{ path: '', component: IssuesComponent },
	{ path: 'poc-translate', loadChildren: () => PocTranslateModule},
	{ path: 'refacto-overlays', loadChildren: () => RefactoOverlaysModule},
	{ path: 'refacto-overlays-tooltip', loadChildren: () => RefactoOverlaysTooltipModule},
];
const issues = [ ...routes].map(r => r.path);
issues.shift();

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
	],
	declarations: [
		IssuesComponent,
	],
	exports: [
		RouterModule,
	],
	providers: [
		{ provide: ISSUES_INDEX_TOKEN, useValue: issues },
	]
})
export class IssuesRouter { }
