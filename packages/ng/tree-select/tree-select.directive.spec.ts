import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TreeNode } from '@lucca-front/ng/core-select';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { TreeSelectDirective } from './tree-select.directive';

interface Node {
	id: number;
	name: string;
	parentId: number | null;
}

// Two branches: "Red" (1 → 2, 3) and "Green" (4 → 5, 6).
const FULL_TREE: Node[] = [
	{ id: 1, name: 'Red', parentId: null },
	{ id: 2, name: 'Tomato', parentId: 1 },
	{ id: 3, name: 'Radish', parentId: 1 },
	{ id: 4, name: 'Green', parentId: null },
	{ id: 5, name: 'Broccoli', parentId: 4 },
	{ id: 6, name: 'Lettuce', parentId: 4 },
];

const byName = (name: string): Node => FULL_TREE.find((node) => node.name === name)!;

@Component({
	template: `<lu-multi-select [treeSelect]="groupingFn" [options]="options()" [optionKey]="optionKey" />`,
	imports: [LuMultiSelectInputComponent, TreeSelectDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	readonly options = signal<Node[]>(FULL_TREE);
	readonly optionKey = (node: Node) => node.id;

	// Parents are resolved against the whole dataset, not against the options currently passed to
	// the select: that's what every tree story does, and it's how a search ends up with an option
	// whose parent is missing from the resultset.
	readonly groupingFn = (node: Node): Node | null => (node.parentId == null ? null : (FULL_TREE.find((candidate) => candidate.id === node.parentId) ?? null));
}

describe(TreeSelectDirective.name, () => {
	let fixture: ComponentFixture<HostComponent>;
	let host: HostComponent;
	let directive: TreeSelectDirective<Node, Node[]>;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HostComponent] });
		fixture = TestBed.createComponent(HostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
		directive = fixture.debugElement.query(By.directive(TreeSelectDirective)).injector.get(TreeSelectDirective);
	});

	function namesOf(nodes: TreeNode<Node>[]): string[] {
		return nodes.map((treeNode) => treeNode.node.name);
	}

	function flatten(nodes: TreeNode<Node>[]): Node[] {
		return nodes.flatMap((treeNode) => [treeNode.node, ...flatten(treeNode.children ?? [])]);
	}

	// The cases below used to wait for a parent that could never come, spinning `generateTrees`'
	// loop forever. A test that hangs can never fail, so cap how many times the items can be read:
	// a resultset that isn't converging then throws instead of locking the whole suite up.
	function withReadBudget(items: Node[], budget = 10_000): Node[] {
		let reads = 0;
		return new Proxy(items, {
			get(target, property, receiver) {
				if (++reads > budget) {
					throw new Error(`generateTrees read its items more than ${budget} times: it is looping without making any progress`);
				}
				return Reflect.get(target, property, receiver);
			},
		});
	}

	describe('generateTrees', () => {
		it('nests every item under its parent', () => {
			const trees = directive.generateTrees(FULL_TREE);

			expect(namesOf(trees)).toEqual(['Red', 'Green']);
			expect(namesOf(trees[0].children!)).toEqual(['Tomato', 'Radish']);
			expect(namesOf(trees[1].children!)).toEqual(['Broccoli', 'Lettuce']);
		});

		// A search only keeps the items matching the clue, so a matching child can very well come
		// without its parent. Such an item has nothing to nest under, and waiting for a parent that
		// will never come used to spin the `while` loop forever, freezing the whole tab.
		it('displays an item whose parent is missing from the resultset at root level', () => {
			const trees = directive.generateTrees(withReadBudget([byName('Tomato'), byName('Radish'), byName('Green'), byName('Broccoli')]));

			expect(namesOf(trees)).toEqual(['Tomato', 'Radish', 'Green']);
			expect(namesOf(trees[2].children!)).toEqual(['Broccoli']);
		});

		it('displays a resultset without any root as a flat list', () => {
			const trees = directive.generateTrees(withReadBudget([byName('Broccoli'), byName('Lettuce')]));

			expect(namesOf(trees)).toEqual(['Broccoli', 'Lettuce']);
			expect(trees.every((treeNode) => treeNode.children?.length === 0)).toBe(true);
		});

		it('keeps every item exactly once, whatever the resultset', () => {
			const items = [byName('Radish'), byName('Green'), byName('Lettuce')];

			expect(flatten(directive.generateTrees(withReadBudget(items)))).toEqual(items);
		});

		it('ignores duplicated items', () => {
			const trees = directive.generateTrees(withReadBudget([byName('Red'), byName('Tomato'), byName('Tomato')]));

			expect(namesOf(trees)).toEqual(['Red']);
			expect(namesOf(trees[0].children!)).toEqual(['Tomato']);
		});

		// Items pointing at each other can never be nested either, and are no reason to hang.
		it('displays items forming a parent cycle at root level', () => {
			const left: Node = { id: 10, name: 'Left', parentId: 11 };
			const right: Node = { id: 11, name: 'Right', parentId: 10 };
			directive.groupingFn.set((node) => (node === left ? right : left));

			expect(namesOf(directive.generateTrees(withReadBudget([left, right])))).toEqual(['Left', 'Right']);
		});

		it('displays an item that is its own parent at root level', () => {
			const self: Node = { id: 12, name: 'Self', parentId: 12 };
			directive.groupingFn.set(() => self);

			expect(namesOf(directive.generateTrees(withReadBudget([self])))).toEqual(['Self']);
		});
	});

	// Same scenario as above, but going through the panel: this is exactly what typing a clue that
	// matches children only does in the tree stories.
	it('renders one treeitem per option when a search drops the parents', fakeAsync(() => {
		const select = fixture.debugElement.query(By.directive(LuMultiSelectInputComponent)).componentInstance as LuMultiSelectInputComponent<Node>;
		const overlay = TestBed.inject(OverlayContainer).getContainerElement();
		// The panel builds the trees itself, so budget the items on the way in to keep a regression
		// a failing test rather than a hanging one.
		const generateTrees = directive.generateTrees.bind(directive);
		vi.spyOn(directive, 'generateTrees').mockImplementation((items: Node[]) => generateTrees(withReadBudget(items)));

		select.openPanel();
		fixture.detectChanges();
		tick(20);
		fixture.detectChanges();
		expect(overlay.querySelectorAll('[role="treeitem"]').length).toBe(FULL_TREE.length);

		// "Search": only the leaves match, every parent is filtered out.
		const leaves = [byName('Tomato'), byName('Broccoli'), byName('Lettuce')];
		host.options.set(leaves);
		fixture.detectChanges();
		tick(20);
		fixture.detectChanges();

		expect(overlay.querySelectorAll('[role="treeitem"]').length).toBe(leaves.length);

		tick();
	}));
});
