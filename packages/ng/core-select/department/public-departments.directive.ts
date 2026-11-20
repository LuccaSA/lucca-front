import { computed, Directive, forwardRef, input, signal } from '@angular/core';
import { CORE_SELECT_API_TOTAL_COUNT_PROVIDER, TreeNode } from '@lucca-front/ng/core-select';
import { ALuCoreSelectApiV5Directive, LuCoreSelectApiV5Item, ɵLU_CORE_SELECT_PUBLIC_API_VERSION } from '@lucca-front/ng/core-select/api';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { NoopTreeSelectDirective } from './noop-tree-select.directive';

export interface LuCoreSelectPublicDepartment extends LuCoreSelectApiV5Item {
	name: string;
	parent?: LuCoreSelectApiV5Item | null;
	sortOrder?: number;
}

@Directive({
	// The attribute is already prefixed with "lu-simple-select" / "lu-multi-select"
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[publicDepartments],lu-multi-select[publicDepartments]',
	exportAs: 'luPublicDepartments',
	providers: [
		{
			provide: CORE_SELECT_API_TOTAL_COUNT_PROVIDER,
			useExisting: forwardRef(() => LuCoreSelectPublicDepartmentsDirective),
		},
	],
	hostDirectives: [NoopTreeSelectDirective],
})
export class LuCoreSelectPublicDepartmentsDirective<T extends LuCoreSelectPublicDepartment = LuCoreSelectPublicDepartment> extends ALuCoreSelectApiV5Directive<T, TreeNode<T>> {
	/**
	 * Query params added to every request, e.g. `{ isArchived: true }` to list the archived departments
	 */
	readonly filters = input<Record<string, string | number | boolean>>({});

	protected override readonly url = signal('/lucca-api/departments');

	protected override readonly apiVersion = signal(ɵLU_CORE_SELECT_PUBLIC_API_VERSION);

	protected override readonly queryParams = computed<Record<string, string | number | boolean>>(() => ({
		isArchived: false,
		...this.filters(),
	}));

	#tree?: { key: string; tree$: Observable<Branch<T>[]> };

	protected override getOptionsPage(params: Record<string, string | number | boolean>, page: number): Observable<{ items: TreeNode<T>[]; isLastPage: boolean }> {
		if (page > 0) {
			return of({ items: [], isLastPage: true });
		}
		const { search, ...treeParams } = params;
		return this.#getTree(treeParams).pipe(
			map((tree) => ({ items: trim(tree, String(search ?? '').toLowerCase()), isLastPage: true })),
			catchError(() => of({ items: [] as TreeNode<T>[], isLastPage: true })),
		);
	}

	protected override optionKey = (option: TreeNode<T> | T) => ('node' in option ? option.node.id : option.id);

	#getTree(params: Record<string, string | number | boolean>): Observable<Branch<T>[]> {
		const key = JSON.stringify(params);
		if (this.#tree?.key !== key) {
			this.#tree = {
				key,
				tree$: this.fetchAll(params).pipe(
					map((collection) => buildTree(collection.items ?? [])),
					shareReplay(1),
				),
			};
		}
		return this.#tree.tree$;
	}
}

interface Branch<T> extends TreeNode<T> {
	children: Branch<T>[];
}

function buildTree<T extends LuCoreSelectPublicDepartment>(departments: T[]): Branch<T>[] {
	const branches = new Map<string, Branch<T>>(departments.map((department) => [department.id, { node: department, children: [] }]));
	const roots: Branch<T>[] = [];
	for (const branch of branches.values()) {
		const parent = branch.node.parent ? branches.get(branch.node.parent.id) : undefined;
		(parent?.children ?? roots).push(branch);
	}
	return sortBranches(roots);
}

function sortBranches<T extends LuCoreSelectPublicDepartment>(branches: Branch<T>[]): Branch<T>[] {
	return branches.sort((a, b) => (a.node.sortOrder ?? 0) - (b.node.sortOrder ?? 0) || a.node.name.localeCompare(b.node.name)).map((branch) => ({ ...branch, children: sortBranches(branch.children) }));
}

function trim<T extends LuCoreSelectPublicDepartment>(branches: Branch<T>[], clue: string): Branch<T>[] {
	if (!clue) {
		return branches;
	}
	return branches.flatMap((branch) => {
		if (branch.node.name.toLowerCase().includes(clue)) {
			return [branch];
		}
		const children = trim(branch.children, clue);
		return children.length ? [{ ...branch, children }] : [];
	});
}
