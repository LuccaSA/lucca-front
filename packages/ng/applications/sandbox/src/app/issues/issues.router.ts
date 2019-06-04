import { Routes, UrlSerializer, DefaultUrlSerializer, UrlTree } from '@angular/router';
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
import { RefactorSelectModule } from './refactor-select';
import { RefactorApiSelectModule } from './refactor-api-select';
import { SplitOptionPickerModule } from './split-option-picker';
import { SplitOptionPickerApiAuserModule } from './split-option-picker-api-auser';
import { SplitOperatorsModule } from './split-operators';
import { SplitOperatorsApiModule } from './split-operators-api';
import { PocPopupModule } from './poc-popup';
import { PocModalModule } from './poc-modal';
import { Fix472Module } from './fix-472';

const routes: Routes = [
	{ path: '', component: IssuesComponent },
	{ path: 'poc-translate', loadChildren: () => PocTranslateModule},
	{ path: 'refacto-overlays', loadChildren: () => RefactoOverlaysModule},
	{ path: 'refacto-overlays-tooltip', loadChildren: () => RefactoOverlaysTooltipModule},
	{ path: 'refacto-overlay-advanced', loadChildren: () => RefactoOverlayAdvancedModule},
	{ path: 'refacto-overlays-reposition', loadChildren: () => RefactoOverlaysRepositionModule},
	{ path: 'refacto-tooltip', loadChildren: () => RefactoTooltipModule},
	{ path: 'refactor-select', loadChildren: () => RefactorSelectModule},
	{ path: 'refactor-api-select', loadChildren: () => RefactorApiSelectModule},
	{ path: 'split-option-picker', loadChildren: () => SplitOptionPickerModule},
	{ path: 'split-option-picker-api-auser', loadChildren: () => SplitOptionPickerApiAuserModule},
	{ path: 'split-operators', loadChildren: () => SplitOperatorsModule},
	{ path: 'split-operators-api', loadChildren: () => SplitOperatorsApiModule},
	{ path: 'poc-popup', loadChildren: () => PocPopupModule},
	{ path: 'poc-modal', loadChildren: () => PocModalModule},
	{ path: 'fix-472', loadChildren: () => Fix472Module},
];
const issues = [ ...routes].map(r => r.path);
issues.shift();

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
	parse(url: string): UrlTree {
		return super.parse(url.toLowerCase());
	}
}
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
		{ provide: UrlSerializer, useClass: LowerCaseUrlSerializer },
	]
})
export class IssuesRouter { }
