import { Routes, UrlSerializer, DefaultUrlSerializer, UrlTree } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IssuesComponent, ISSUES_INDEX_TOKEN } from './issues.component';

/*tslint:disable*/
const routes: Routes = [
	{ path: '', component: IssuesComponent },

	{ path: 'poc-translate', loadChildren: () => import('./poc-translate').then(m => m.PocTranslateModule) },
	{ path: 'refacto-overlays', loadChildren: () => import('./refacto-overlays').then(m => m.RefactoOverlaysModule) },
	{ path: 'refacto-overlays-tooltip', loadChildren: () => import('./refacto-overlays-tooltip').then(m => m.RefactoOverlaysTooltipModule) },
	{ path: 'refacto-overlay-advanced', loadChildren: () => import('./refacto-overlay-advanced').then(m => m.RefactoOverlayAdvancedModule) },
	{ path: 'refacto-overlays-reposition', loadChildren: () => import('./refacto-overlays-reposition').then(m => m.RefactoOverlaysRepositionModule) },
	{ path: 'refacto-tooltip', loadChildren: () => import('./refacto-tooltip').then(m => m.RefactoTooltipModule) },
	{ path: 'refactor-select', loadChildren: () => import('./refactor-select/refactor-select.module').then(m => m.RefactorSelectModule) },
	{ path: 'refactor-api-select', loadChildren: () => import('./refactor-api-select').then(m => m.RefactorApiSelectModule) },
	{ path: 'split-option-picker', loadChildren: () => import('./split-option-picker').then(m => m.SplitOptionPickerModule) },
	{ path: 'split-option-picker-api-auser', loadChildren: () => import('./split-option-picker-api-auser').then(m => m.SplitOptionPickerApiAuserModule) },
	{ path: 'split-operators', loadChildren: () => import('./split-operators').then(m => m.SplitOperatorsModule) },
	{ path: 'split-operators-api', loadChildren: () => import('./split-operators-api').then(m => m.SplitOperatorsApiModule) },
	{ path: 'poc-popup', loadChildren: () => import('./poc-popup').then(m => m.PocPopupModule) },
	{ path: 'poc-modal', loadChildren: () => import('./poc-modal').then(m => m.PocModalModule) },
	{ path: 'fix-472', loadChildren: () => import('./fix-472').then(m => m.Fix472Module) },
	{ path: 'poc-tree', loadChildren: () => import('./poc-tree').then(m => m.PocTreeModule) },
	{ path: 'tree-picker-advanced', loadChildren: () => import('./tree-picker-advanced').then(m => m.TreePickerAdvancedModule) },
	{ path: 'department-select', loadChildren: () => import('./department-select').then(m => m.DepartmentSelectModule) },
	{ path: 'split-select', loadChildren: () => import('./split-select').then(m => m.SplitSelectModule) },
	{ path: 'user-select-translate', loadChildren: () => import('./user-select-translate').then(m => m.UserSelectTranslateModule) },
	{ path: 'sidepanel', loadChildren: () => import('./sidepanel').then(m => m.SidepanelModule) },
	{ path: 'node-sass-end', loadChildren: () => import('./node-sass-end').then(m => m.NodeSassEndModule) },
	{ path: 'fix-modal', loadChildren: () => import('./fix-modal').then(m => m.FixModalModule) },
	{ path: 'fix-705-select-enter', loadChildren: () => import('./fix-705-select-enter').then(m => m.Fix705SelectEnterModule) },
	{ path: 'modals-no-submit', loadChildren: () => import('./modals-no-submit').then(m => m.ModalsNoSubmitModule) },
	{ path: 'user-select-translate', loadChildren: () => import('./user-select-translate').then(m => m.UserSelectTranslateModule) },
	{ path: 'sidepanel', loadChildren: () => import('./sidepanel').then(m => m.SidepanelModule) },
	{ path: 'node-sass-end', loadChildren: () => import('./node-sass-end').then(m => m.NodeSassEndModule) },
	{ path: 'fix-modal', loadChildren: () => import('./fix-modal').then(m => m.FixModalModule) },
	{ path: 'modals-no-submit', loadChildren: () => import('./modals-no-submit').then(m => m.ModalsNoSubmitModule) },
	{ path: 'select-overlap', loadChildren: () => import('./select-overlap').then(m => m.SelectOverlapModule) },
	{ path: 'modal-synched', loadChildren: () => import('./modal-synched').then(m => m.ModalSynchedModule) },
	{ path: 'user-select-homonyms', loadChildren: () => import('./user-select-homonyms').then(m => m.UserSelectHomonymsModule) },
	{ path: 'formly', loadChildren: () => import('./formly').then(m => m.FormlyModule) },
	{ path: 'formly-wrappers', loadChildren: () => import('./formly-wrappers').then(m => m.FormlyWrappersModule) },
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
