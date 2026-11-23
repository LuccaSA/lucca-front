import { HttpClient } from '@angular/common/http';
import { computed, Directive, forwardRef, inject, input, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { isNotNil, luBooleanAttribute, luNullableNumberAttribute } from '@lucca-front/ng/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, CoreSelectApiTotalCountProvider, TreeNode } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
import { ILuDepartment } from '@lucca-front/ng/department';
import { map, Observable, of } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { LuDepartmentOptionComponent } from './department-option.component';
import { LU_CORE_SELECT_CURRENT_DEPARTMENT_ID } from './my-department.provider';
import { NoopTreeSelectDirective } from './noop-tree-select.directive';

/**
 * Key of the "My department" option, so it is tracked apart from the same department, which stays at its place in the tree.
 */
const MY_DEPARTMENT_OPTION_KEY = Symbol('LuMyDepartmentOption');

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
	public readonly currentDepartmentId = inject(LU_CORE_SELECT_CURRENT_DEPARTMENT_ID, { optional: true });

	readonly url = input<string>('/organization/structure/api/departments/tree');
	readonly countUrl = input<string>('/organization/structure/api/departments');
	readonly filters = input<Record<string, string | number | boolean> | null>(null);
	/** @deprecated use `uniqueOperationIds` instead */
	readonly operationIds = input<readonly number[] | null>(null);
	readonly uniqueOperationIds = input<readonly number[] | null>(null);
	/** @deprecated use `uniqueOperationIds` instead */
	readonly appInstanceId = input(null, { transform: luNullableNumberAttribute });
	readonly searchDelimiter = input<string>(' ');
	/**
	 * Display the department of the current user as the first option, while the search is empty.
	 * The app must provide it with `provideCoreSelectCurrentDepartmentId`, otherwise the option is not displayed.
	 */
	readonly displayMyDepartmentOption = input(false, { transform: luBooleanAttribute });

	/**
	 * Department displayed as "My department", set along with the options that display it. It is a copy of the
	 * department of the tree, so the option can be told apart from that department, which stays at its place.
	 * Like any parent department, it selects its sub-departments too, or only itself, or only them.
	 */
	readonly #myDepartmentOption = signal<T | null>(null);

	constructor() {
		super();
		this.select.optionTpl.set(LuDepartmentOptionComponent);
	}

	public override ngOnInit(): void {
		super.ngOnInit();
	}

	protected override getOptionsPage(params: Record<string, string | number | boolean> | null, page: number): Observable<{ items: TreeNode<T>[]; isLastPage: boolean }> {
		if (page > 0) {
			return of({ items: [], isLastPage: true });
		}

		return super.getOptionsPage(params, page).pipe(map((result) => ({ ...result, isLastPage: true })));
	}

	protected override getOptions(params: Record<string, string | number | boolean> | null): Observable<TreeNode<T>[]> {
		// The department tree endpoint is not searchable, so we fetch the whole tree and filter it
		// client-side by the current clue. `currentClue$` is set by `buildParamsFromClue` right before
		// this call, so it reflects the clue driving this query (empty clue keeps the full tree).
		const clue = this.currentClue$.value;
		return this.httpClient
			.get<{ children?: TreeNode<T>[] }>(this.url(), {
				params: params ?? {},
			})
			.pipe(
				map((data) => ({ myDepartment: this.#getMyDepartmentOption(data.children ?? [], clue), options: this.trim(data.children ?? [], clue) })),
				tap(({ myDepartment }) => this.#myDepartmentOption.set(myDepartment?.node ?? null)),
				map(({ myDepartment, options }) => (myDepartment ? [myDepartment, ...options] : options)),
			);
	}

	/**
	 * Whether the option is the one displayed as "My department", at the top of the options.
	 */
	public isMyDepartmentOption(option: TreeNode<T> | T): boolean {
		return this.#toDepartment(option) === this.#myDepartmentOption();
	}

	#getMyDepartmentOption(tree: readonly TreeNode<T>[], clue: string): TreeNode<T> | null {
		if (!this.displayMyDepartmentOption() || this.currentDepartmentId === null || clue) {
			return null;
		}
		// Looked up in the fetched tree, which has the same restrictions as the options: only displayed when selectable
		const branch = this.#findBranch(tree, this.currentDepartmentId);
		// Collapsed: its sub-departments are not displayed again, but it still selects them like any parent department
		return branch ? { node: { ...branch.node }, children: branch.children ?? [], ɵcollapsed: true } : null;
	}

	#findBranch(tree: readonly TreeNode<T>[], id: number): TreeNode<T> | null {
		for (const branch of tree) {
			const found = branch.node.id === id ? branch : this.#findBranch(branch.children ?? [], id);
			if (found) {
				return found;
			}
		}
		return null;
	}

	#toDepartment(option: TreeNode<T> | T): T {
		return 'node' in option ? option.node : option;
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

	protected override readonly paramsSignal = computed<Record<string, string | number | boolean>>(() => {
		const operationIds = this.operationIds();
		const uniqueOperationIds = this.uniqueOperationIds();
		const appInstanceId = this.appInstanceId();
		return {
			...this.filters(),
			...(operationIds ? { operations: operationIds.join(',') } : {}),
			...(uniqueOperationIds ? { uniqueOperations: uniqueOperationIds.join(',') } : {}),
			...(appInstanceId ? { appInstanceId } : {}),
		};
	});
	protected override readonly params$: Observable<Record<string, string | number | boolean>> = toObservable(this.paramsSignal);

	public override readonly totalCount$ = toObservable(computed(() => ({ url: this.countUrl(), filters: this.filters() }))).pipe(
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
		return this.isMyDepartmentOption(option) ? MY_DEPARTMENT_OPTION_KEY : this.#toDepartment(option).id;
	};

	// Compares the departments themselves, so "My department" and the same department in the tree are both selected
	protected override optionComparer = (a: TreeNode<T> | T, b: TreeNode<T> | T) => a === b || (!!a && !!b && this.#toDepartment(a).id === this.#toDepartment(b).id);
}
