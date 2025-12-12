import { HttpClient } from '@angular/common/http';
import { computed, Directive, forwardRef, inject, input, OnInit } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider, TreeNode } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { ILuDepartment } from '@lucca-front/ng/department';
import { combineLatest, map, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
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

	url = input<string>('/organization/structure/api/departments/tree');
	filters = input<Record<string, string | number | boolean> | null>(null);
	operationIds = input<readonly number[] | null>(null);
	uniqueOperationIds = input<readonly number[] | null>(null);
	appInstanceId = input<number | null>(null);
	searchDelimiter = input<string>(' ');

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

	protected override getOptions(params: Record<string, string | number | boolean> | null): Observable<TreeNode<T>[]> {
		return this.httpClient
			.get<TreeNode<T>>(this.url(), {
				params,
			})
			.pipe(
				map((data) => {
					return data.children;
				}),
			);
	}

	trim(options: TreeNode<T>[], clue: string): TreeNode<T>[] {
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
			.filter((o) => !!o);
	}

	protected override params$: Observable<Record<string, string | number | boolean>> = toObservable(
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

	public totalCount$ = this.select.options$.pipe(
		filter((opts) => opts.length > 0),
		map((opts) => {
			return opts.map((branch) => this.flattenTree(branch)).flat().length;
		}),
	);

	protected flattenTree(branch: TreeNode<T>): T[] {
		const result: T[] = [branch.node];
		if (branch.children.length > 0) {
			result.push(...branch.children.map((child) => this.flattenTree(child)).flat());
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
