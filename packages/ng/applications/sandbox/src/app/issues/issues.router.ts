import { Routes, UrlSerializer, DefaultUrlSerializer, UrlTree } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IssuesComponent, ISSUES_INDEX_TOKEN } from './issues.component';

/*tslint:disable*/
const routes: Routes = [
	{ path: '', component: IssuesComponent },

	{ path: 'date-calendar', loadChildren: () => import('./date-calendar').then(m => m.DateCalendarModule) },
	{ path: 'date-input', loadChildren: () => import('./date-input').then(m => m.DateInputModule) },
	{ path: 'date-minmax', loadChildren: () => import('./date-minmax').then(m => m.DateMinmaxModule) },
	{ path: 'date-picker', loadChildren: () => import('./date-picker').then(m => m.DatePickerModule) },
	{ path: 'date-select', loadChildren: () => import('./date-select').then(m => m.DateSelectModule) },
	{ path: 'date-utc', loadChildren: () => import('./date-utc').then(m => m.DateUtcModule) },
	{ path: 'department-select', loadChildren: () => import('./department-select').then(m => m.DepartmentSelectModule) },
	{ path: 'fix-472', loadChildren: () => import('./fix-472').then(m => m.Fix472Module) },
	{ path: 'fix-705-select-enter', loadChildren: () => import('./fix-705-select-enter').then(m => m.Fix705SelectEnterModule) },
	{ path: 'fix-modal', loadChildren: () => import('./fix-modal').then(m => m.FixModalModule) },
	{ path: 'formly-framed', loadChildren: () => import('./formly-framed').then(m => m.FormlyFramedModule) },
	{ path: 'formly-wrappers', loadChildren: () => import('./formly-wrappers').then(m => m.FormlyWrappersModule) },
	{ path: 'formly', loadChildren: () => import('./formly').then(m => m.FormlyModule) },
	{ path: 'ivy-api-select', loadChildren: () => import('./ivy-api-select').then(m => m.IvyApiSelectModule) },
	{ path: 'ivy-option-picker', loadChildren: () => import('./ivy-option-picker').then(m => m.IvyOptionPickerModule) },
	{ path: 'ivy-tree', loadChildren: () => import('./ivy-tree').then(m => m.IvyTreeModule) },
	{ path: 'modal-dismiss', loadChildren: () => import('./modal-dismiss').then(m => m.ModalDismissModule) },
	{ path: 'modal-synched', loadChildren: () => import('./modal-synched').then(m => m.ModalSynchedModule) },
	{ path: 'modals-no-submit', loadChildren: () => import('./modals-no-submit').then(m => m.ModalsNoSubmitModule) },
	{ path: 'node-sass-end', loadChildren: () => import('./node-sass-end').then(m => m.NodeSassEndModule) },
	{ path: 'option-comparer', loadChildren: () => import('./option-comparer').then(m => m.OptionComparerModule) },
	{ path: 'option-selector', loadChildren: () => import('./option-selector').then(m => m.OptionSelectorModule) },
	{ path: 'picker-structure', loadChildren: () => import('./picker-structure').then(m => m.PickerStructureModule) },
	{ path: 'poc-modal', loadChildren: () => import('./poc-modal').then(m => m.PocModalModule) },
	{ path: 'poc-popup', loadChildren: () => import('./poc-popup').then(m => m.PocPopupModule) },
	{ path: 'poc-translate', loadChildren: () => import('./poc-translate').then(m => m.PocTranslateModule) },
	{ path: 'poc-tree', loadChildren: () => import('./poc-tree').then(m => m.PocTreeModule) },
	{ path: 'refacto-overlay-advanced', loadChildren: () => import('./refacto-overlay-advanced').then(m => m.RefactoOverlayAdvancedModule) },
	{ path: 'refacto-overlays-reposition', loadChildren: () => import('./refacto-overlays-reposition').then(m => m.RefactoOverlaysRepositionModule) },
	{ path: 'refacto-overlays-tooltip', loadChildren: () => import('./refacto-overlays-tooltip').then(m => m.RefactoOverlaysTooltipModule) },
	{ path: 'refacto-overlays', loadChildren: () => import('./refacto-overlays').then(m => m.RefactoOverlaysModule) },
	{ path: 'refacto-tooltip', loadChildren: () => import('./refacto-tooltip').then(m => m.RefactoTooltipModule) },
	{ path: 'refactor-api-select', loadChildren: () => import('./refactor-api-select').then(m => m.RefactorApiSelectModule) },
	{ path: 'refactor-select', loadChildren: () => import('./refactor-select').then(m => m.RefactorSelectModule) },
	{ path: 'select-overlap', loadChildren: () => import('./select-overlap').then(m => m.SelectOverlapModule) },
	{ path: 'sidepanel', loadChildren: () => import('./sidepanel').then(m => m.SidepanelModule) },
	{ path: 'split-operators-api', loadChildren: () => import('./split-operators-api').then(m => m.SplitOperatorsApiModule) },
	{ path: 'split-operators', loadChildren: () => import('./split-operators').then(m => m.SplitOperatorsModule) },
	{ path: 'split-option-picker-api-auser', loadChildren: () => import('./split-option-picker-api-auser').then(m => m.SplitOptionPickerApiAuserModule) },
	{ path: 'split-option-picker', loadChildren: () => import('./split-option-picker').then(m => m.SplitOptionPickerModule) },
	{ path: 'split-select', loadChildren: () => import('./split-select').then(m => m.SplitSelectModule) },
	{ path: 'tree-picker-advanced', loadChildren: () => import('./tree-picker-advanced').then(m => m.TreePickerAdvancedModule) },
	{ path: 'user-select-homonyms', loadChildren: () => import('./user-select-homonyms').then(m => m.UserSelectHomonymsModule) },
	{ path: 'user-select-translate', loadChildren: () => import('./user-select-translate').then(m => m.UserSelectTranslateModule) },
	{ path: 'popover-accessible', loadChildren: () => import('./popover-accessible').then(m => m.PopoverAccessibleModule) },
	{ path: 'modal-undismissable', loadChildren: () => import('./modal-undismissable').then(m => m.ModalUndismissableModule) },
	{ path: 'dropdown', loadChildren: () => import('./dropdown').then(m => m.DropdownModule) },
	{ path: 'date-string', loadChildren: () => import('./date-string').then(m => m.DateStringModule) },
	{ path: 'select-me-first', loadChildren: () => import('./select-me-first').then(m => m.SelectMeFirstModule) },
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
