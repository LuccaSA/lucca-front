import { HttpClient } from '@angular/common/http';
import { computed, Directive, forwardRef, inject, input, OnInit } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { isNotNil } from '@lucca-front/ng/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider, TreeNode } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { ILuDepartment } from '@lucca-front/ng/department';
import { combineLatest, map, Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { NoopTreeSelectDirective } from './noop-tree-select.directive';

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[departments],lu-multi-select[departments]',
	exportAs: 'luDepartments',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectDepartmentsDirective),
		},
	],
	hostDirectives: [NoopTreeSelectDirective],
})
export class LuCoreSelectDepartmentsDirective<T extends ILuDepartment = ILuDepartment> extends ALuCoreSelectApiDirective<TreeNode<T>> implements OnInit, CoreSelectApiTotalCountProvider {
	protected httpClient = inject(HttpClient);

	readonly url = input<string>('/organization/structure/api/departments/tree');
	readonly countUrl = input<string>('/organization/structure/api/departments');
	readonly filters = input<Record<string, string | number | boolean> | null>(null);
	readonly operationIds = input<readonly number[] | null>(null);
	readonly uniqueOperationIds = input<readonly number[] | null>(null);
	readonly appInstanceId = input<number | null>(null);
	readonly searchDelimiter = input<string>(' ');

	public override ngOnInit(): void {
		super.ngOnInit();
	}

	protected override buildOptions(): Observable<TreeNode<T>[]> {
		return combineLatest([super.buildOptions(), this.clue$]).pipe(
			map(([data, clue]) => {
				return this.trim(data, clue);
			}),
		);
	}

	protected override getOptionsPage(params: Record<string, string | number | boolean> | null, page: number): Observable<{ items: TreeNode<T>[]; isLastPage: boolean }> {
		if (page > 0) {
			return of({ items: [], isLastPage: true });
		}

		return super.getOptionsPage(params, page).pipe(map((result) => ({ ...result, isLastPage: true })));
	}

	protected override getOptions(params: Record<string, string | number | boolean> | null): Observable<TreeNode<T>[]> {
		return this.httpClient
			.get<{ children?: TreeNode<T>[] }>(this.url(), {
				params: params ?? {},
			})
			.pipe(
				map((data) => {
					return data.children ?? [];
				}),
			);
	}

	trim(options: readonly TreeNode<T>[], clue: string): TreeNode<T>[] {
		return options
			.map((option) => {
				if (option.node.name.toLowerCase().includes(clue.toLowerCase())) {
					return { ...option };
				}
				const trimmedChildren = option.children ? this.trim(option.children, clue) : [];
				if (trimmedChildren.length) {
					return { ...option, children: trimmedChildren };
				}
				return undefined;
			})
			.filter(isNotNil);
	}

	protected override readonly params$: Observable<Record<string, string | number | boolean>> = toObservable(
		computed(() => {
			const operationIds = this.operationIds();
			const uniqueOperationIds = this.uniqueOperationIds();
			const appInstanceId = this.appInstanceId();
			return {
				...this.filters(),
				...(operationIds ? { operations: operationIds.join(',') } : {}),
				...(uniqueOperationIds ? { uniqueOperations: uniqueOperationIds.join(',') } : {}),
				...(appInstanceId ? { appInstanceId } : {}),
			};
		}),
	);

	public readonly totalCount$ = toObservable(computed(() => ({ url: this.countUrl(), filters: this.filters() }))).pipe(
		debounceTime(250),
		switchMap(({ url, filters }) =>
			this.httpClient.get<{ count: number }>(url, {
				params: {
					...filters,
					limit: 0,
					['fields.root']: 'count',
				},
			}),
		),
		map((res) => res?.count ?? 0),
	);

	protected flattenTree(branch: TreeNode<T>): T[] {
		const result: T[] = [branch.node];
		const children = branch.children ?? [];
		if (children.length > 0) {
			result.push(...children.map((child) => this.flattenTree(child)).flat());
		}
		return result;
	}

	protected override optionKey = (option: TreeNode<T> | T) => {
		if (!option) {
			return null;
		}
		return 'node' in option ? option.node.id : option.id;
	};
}
