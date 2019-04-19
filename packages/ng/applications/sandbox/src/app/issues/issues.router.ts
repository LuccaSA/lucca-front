import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PocTranslateModule } from './poc-translate';
import { RefactoOverlaysModule } from './refacto-overlays';
import { RefactoOverlaysTooltipModule } from './refacto-overlays-tooltip';
import { CommonModule } from '@angular/common';
import { IssuesComponent, ISSUES_INDEX_TOKEN } from './issues.component';
import { RefactoOverlayAdvancedModule } from './refacto-overlay-advanced';
import { RefactoOverlaysRepositionModule } from './refacto-overlays-reposition';
import { RefactoTooltipModule } from './refacto-tooltip';

const routes: Routes = [
	{ path: '', component: IssuesComponent },
	{ path: 'poc-translate', loadChildren: () => PocTranslateModule},
	{ path: 'refacto-overlays', loadChildren: () => RefactoOverlaysModule},
	{ path: 'refacto-overlays-tooltip', loadChildren: () => RefactoOverlaysTooltipModule},
	{ path: 'refacto-overlay-advanced', loadChildren: () => RefactoOverlayAdvancedModule},
	{ path: 'refacto-overlays-reposition', loadChildren: () => RefactoOverlaysRepositionModule},
	{ path: 'refacto-tooltip', loadChildren: () => RefactoTooltipModule},
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
