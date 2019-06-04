import { Routes, UrlSerializer, DefaultUrlSerializer, UrlTree } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IssuesComponent, ISSUES_INDEX_TOKEN } from './issues.component';


/*tslint:disable*/
const routes: Routes = [
	{ path: '', component: IssuesComponent },

	{ path: 'poc-translate', loadChildren: () => import('./poc-translate/poc-translate.module').then(m => m.PocTranslateModule) },
	{ path: 'refacto-overlays', loadChildren: () => import('./refacto-overlays/refacto-overlays.module').then(m => m.RefactoOverlaysModule) },
	{ path: 'refacto-overlays-tooltip', loadChildren: () => import('./refacto-overlays-tooltip/refacto-overlays-tooltip.module').then(m => m.RefactoOverlaysTooltipModule) },
	{ path: 'refacto-overlay-advanced', loadChildren: () => import('./refacto-overlay-advanced/refacto-overlay-advanced.module').then(m => m.RefactoOverlayAdvancedModule) },
	{ path: 'refacto-overlays-reposition', loadChildren: () => import('./refacto-overlays-reposition/refacto-overlays-reposition.module').then(m => m.RefactoOverlaysRepositionModule) },
	{ path: 'refacto-tooltip', loadChildren: () => import('./refacto-tooltip/refacto-tooltip.module').then(m => m.RefactoTooltipModule) },
	{ path: 'refactor-select', loadChildren: () => import('./refactor-select/refactor-select.module').then(m => m.RefactorSelectModule) },
	{ path: 'refactor-api-select', loadChildren: () => import('./refactor-api-select/refactor-api-select.module').then(m => m.RefactorApiSelectModule) },
	{ path: 'split-option-picker', loadChildren: () => import('./split-option-picker/split-option-picker.module').then(m => m.SplitOptionPickerModule) },
	{ path: 'split-option-picker-api-auser', loadChildren: () => import('./split-option-picker-api-auser/split-option-picker-api-auser.module').then(m => m.SplitOptionPickerApiAuserModule) },
	{ path: 'split-operators', loadChildren: () => import('./split-operators/split-operators.module').then(m => m.SplitOperatorsModule) },
	{ path: 'split-operators-api', loadChildren: () => import('./split-operators-api/split-operators-api.module').then(m => m.SplitOperatorsApiModule) },
	{ path: 'poc-popup', loadChildren: () => import('./poc-popup/poc-popup.module').then(m => m.PocPopupModule) },
	{ path: 'poc-modal', loadChildren: () => import('./poc-modal/poc-modal.module').then(m => m.PocModalModule) },
	{ path: 'fix-472', loadChildren: () => import('./fix-472/fix-472.module').then(m => m.Fix472Module) },
];
/*tslint:enable*/
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
