import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { TreeSelectDirective } from '../tree-select.directive';

interface Node {
	id: number;
	name: string;
	parentId: number | null;
}

// Two parent-closed branches: "Red" (1 → 2, 3) and "Green" (4 → 5, 6).
const FULL_TREE: Node[] = [
	{ id: 1, name: 'Red', parentId: null },
	{ id: 2, name: 'Tomato', parentId: 1 },
	{ id: 3, name: 'Radish', parentId: 1 },
	{ id: 4, name: 'Green', parentId: null },
	{ id: 5, name: 'Broccoli', parentId: 4 },
	{ id: 6, name: 'Lettuce', parentId: 4 },
];

// A parent-closed subset: only the "Red" branch survives the "search".
const FILTERED_TREE: Node[] = FULL_TREE.filter((n) => n.id <= 3);

@Component({
	template: `<lu-multi-select [treeSelect]="groupingFn" [options]="options()" [optionKey]="optionKey" />`,
	imports: [LuMultiSelectInputComponent, TreeSelectDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	readonly options = signal<Node[]>(FULL_TREE);
	readonly optionKey = (node: Node) => node.id;
	readonly groupingFn = (node: Node, all: Node[]): Node | null => (node.parentId == null ? null : (all.find((n) => n.id === node.parentId) ?? null));
}

describe('TreeBranchComponent: no option-registry leak across searches', () => {
	let fixture: ComponentFixture<HostComponent>;
	let host: HostComponent;
	let select: LuMultiSelectInputComponent<Node>;
	let overlay: HTMLElement;

	function flush(): void {
		fixture.detectChanges();
		tick(20);
		fixture.detectChanges();
	}

	// The panel component's `options` signal is the manual registry each CoreSelectPanelElement
	// adds itself to on construction and removes itself from in ngOnDestroy. A tree leak
	// would show up here as stale entries accumulating instead of tracking the visible nodes.
	// `instance` lives on the concrete (non-exported) panel ref, so reach it via a minimal cast.
	function registrySize(): number {
		const ref = select.panelRef as unknown as { instance: { options: () => readonly unknown[] } };
		return ref.instance.options().length;
	}

	function treeitemsInDom(): number {
		return overlay.querySelectorAll('[role="treeitem"]').length;
	}

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HostComponent] });
		fixture = TestBed.createComponent(HostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
		select = fixture.debugElement.query(By.directive(LuMultiSelectInputComponent)).componentInstance;
		overlay = TestBed.inject(OverlayContainer).getContainerElement();
	});

	it('deregisters branch options on every search so the registry never grows', fakeAsync(() => {
		select.openPanel();
		flush();

		const baseline = registrySize();
		// One CoreSelectPanelElement (treeitem) per tree node.
		expect(baseline).toBe(FULL_TREE.length);
		expect(treeitemsInDom()).toBe(FULL_TREE.length);

		for (let i = 0; i < 10; i++) {
			// "Search": the tree re-renders with a smaller node set, destroying branches.
			host.options.set(FILTERED_TREE);
			flush();
			expect(registrySize()).toBe(FILTERED_TREE.length);

			// "Clear": the full tree comes back, recreating branches.
			host.options.set(FULL_TREE);
			flush();
			// If ngOnDestroy failed to deregister, this would climb by the leaked count each cycle.
			expect(registrySize()).toBe(baseline);
		}

		expect(registrySize()).toBe(baseline);
		expect(treeitemsInDom()).toBe(baseline);

		tick();
	}));
});
