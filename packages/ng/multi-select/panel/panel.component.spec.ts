import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, getDebugNode } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ɵCoreSelectPanelElement } from '@lucca-front/ng/core-select';
import { TreeSelectDirective } from '@lucca-front/ng/tree-select';
import { LuMultiSelectInputComponent } from '../input/select-input.component';

type Entity = { id: number; name: string };

describe('LuMultiSelectPanelComponent (listbox rendering)', () => {
	let fixture: ComponentFixture<LuMultiSelectInputComponent<Entity>>;
	let component: LuMultiSelectInputComponent<Entity>;
	let overlayContainerElement: HTMLElement;

	const options: Entity[] = [
		{ id: 1, name: 'Carotte' },
		{ id: 2, name: 'Poireau' },
		{ id: 3, name: 'Navet' },
	];

	function openPanel(opts: Entity[] = options): void {
		fixture.componentRef.setInput('options', opts);
		fixture.detectChanges();
		component.openPanel();
		fixture.detectChanges();
		tick(20);
		fixture.detectChanges();
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [LuMultiSelectInputComponent],
		});

		fixture = TestBed.createComponent<LuMultiSelectInputComponent<Entity>>(LuMultiSelectInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
	});

	it('should render a multiselectable lu-listbox carrying the listbox role', fakeAsync(() => {
		openPanel();

		const listbox = overlayContainerElement.querySelector('lu-listbox')!;
		expect(listbox).toBeTruthy();
		expect(listbox.getAttribute('role')).toBe('listbox');
		expect(listbox.getAttribute('aria-multiselectable')).toBe('true');
		expect(listbox.classList).toContain('mod-multiple');

		// The role moved from the scroll container to the listbox itself
		const pickerContent = overlayContainerElement.querySelector('.lu-select-panel-layout-content')!;
		expect(pickerContent.hasAttribute('role')).toBe(false);

		expect(overlayContainerElement.querySelectorAll('lu-select-option').length).toBe(3);
	}));

	it('should render a single checkbox per option and no legacy markup', fakeAsync(() => {
		openPanel();

		const optionHost = overlayContainerElement.querySelector('lu-select-option')!;
		// lu-select-option is only the behavioural host; the option role lives on lu-listbox-option
		expect(optionHost.getAttribute('role')).toBe('presentation');
		expect(optionHost.querySelector('lu-listbox-option')!.getAttribute('role')).toBe('option');
		expect(optionHost.querySelectorAll('.checkboxField').length).toBe(1);
		expect(optionHost.querySelector('.optionItem-value')).toBeNull();
	}));

	it('should reflect selection on aria-selected and is-selected class of the listbox option', fakeAsync(() => {
		component.writeValue([options[1]]);
		openPanel();

		const listboxOptions = Array.from(overlayContainerElement.querySelectorAll('lu-listbox-option'));
		const selected = listboxOptions.filter((option) => option.getAttribute('aria-selected') === 'true');
		expect(selected.length).toBe(1);
		expect(selected[0].textContent).toContain('Poireau');
		expect(selected[0].classList).toContain('is-selected');
	}));

	it('should expose a partially selected option through aria-checked rather than aria-selected', fakeAsync(() => {
		openPanel();

		const host = overlayContainerElement.querySelectorAll<HTMLElement>('lu-select-option')[1];
		// The panel does not compute a partial state yet: drive it the way a parent row will
		getDebugNode(host)!.injector.get(ɵCoreSelectPanelElement).isMixed.set(true);
		fixture.detectChanges();

		const listboxOption = host.querySelector('lu-listbox-option')!;
		expect(listboxOption.getAttribute('aria-checked')).toBe('mixed');
		expect(listboxOption.hasAttribute('aria-selected')).toBe(false);
	}));

	it('should toggle the clicked option in the emitted value', fakeAsync(() => {
		const onChange = vi.fn();
		component.registerOnChange(onChange);
		openPanel();

		const hosts = overlayContainerElement.querySelectorAll<HTMLElement>('lu-select-option');
		hosts[2].click();
		fixture.detectChanges();

		expect(onChange).toHaveBeenCalledWith([options[2]]);
	}));

	it('should unselect a selected option when it is clicked', fakeAsync(() => {
		const onChange = vi.fn();
		component.writeValue([options[0], options[1]]);
		component.registerOnChange(onChange);
		openPanel();

		const hosts = overlayContainerElement.querySelectorAll<HTMLElement>('lu-select-option');
		hosts[1].click();
		fixture.detectChanges();

		expect(onChange).toHaveBeenLastCalledWith([options[0]]);
	}));

	it('should display the empty state and keep the add option visible outside the listbox', fakeAsync(() => {
		fixture.componentRef.setInput('addOptionStrategy', 'always');
		openPanel([]);

		const listbox = overlayContainerElement.querySelector('lu-listbox')!;
		expect(listbox.querySelector('lu-listbox-option[aria-hidden="true"]')).toBeTruthy();

		const addOption = overlayContainerElement.querySelector<HTMLElement>('lu-listbox-option.mod-add')!;
		expect(addOption).toBeTruthy();
		expect(addOption.closest('lu-listbox')).toBeNull();
		expect(addOption.getAttribute('id')).toBe('picker-content-add');
	}));

	describe('listbox status', () => {
		function listbox(): HTMLElement {
			return overlayContainerElement.querySelector<HTMLElement>('lu-listbox')!;
		}

		it('should announce the loading state rather than the empty state while options are fetched', fakeAsync(() => {
			fixture.componentRef.setInput('loading', true);
			openPanel([]);

			// Loading takes precedence: the "no result" option must never flash during a fetch
			expect(listbox().querySelector('lu-listbox-option[empty]')).toBeNull();
			expect(listbox().textContent).toContain('Loading...');
		}));

		it('should tell that there are no options when nothing is searched', fakeAsync(() => {
			openPanel([]);

			expect(listbox().querySelector('lu-listbox-option[empty]')!.textContent).toContain('There are no values available.');
		}));

		it('should tell that the search has no results when a clue is typed', fakeAsync(() => {
			openPanel([]);

			component.clueChanged('zzz');
			fixture.detectChanges();
			tick(20);
			fixture.detectChanges();

			expect(listbox().querySelector('lu-listbox-option[empty]')!.textContent).toContain('We couldn’t find any results that match your search.');
		}));
	});

	describe('pagination', () => {
		function scrollContentTo(scrollTop: number): void {
			const content = overlayContainerElement.querySelector<HTMLElement>('.lu-select-panel-layout-content')!;
			// happy-dom does not lay out, so the scroll metrics are simulated
			Object.defineProperty(content, 'scrollHeight', { configurable: true, value: 500 });
			Object.defineProperty(content, 'clientHeight', { configurable: true, value: 200 });
			content.scrollTop = scrollTop;
			content.dispatchEvent(new Event('scroll'));
			fixture.detectChanges();
		}

		it('should request the next page only when scrolled to the bottom', fakeAsync(() => {
			const nextPage = vi.fn();
			component.nextPage.subscribe(nextPage);
			openPanel();

			scrollContentTo(100);
			expect(nextPage).not.toHaveBeenCalled();

			scrollContentTo(300);
			expect(nextPage).toHaveBeenCalledOnce();
		}));
	});
});

type TreeNodeEntity = { id: number; name: string; parentId: number | null };

describe('LuMultiSelectPanelComponent (tree mode)', () => {
	// One branch: "Red" (1) → "Tomato" (2), "Radish" (3)
	const red: TreeNodeEntity = { id: 1, name: 'Red', parentId: null };
	const tomato: TreeNodeEntity = { id: 2, name: 'Tomato', parentId: 1 };
	const radish: TreeNodeEntity = { id: 3, name: 'Radish', parentId: 1 };
	// A second root, so collapsing the first branch leaves somewhere for the keyboard to land
	const blue: TreeNodeEntity = { id: 4, name: 'Blue', parentId: null };
	const tree = [red, tomato, radish, blue];

	@Component({
		template: `<lu-multi-select
			[treeSelect]="groupingFn"
			[collapsible]="collapsible"
			[parentStandsForChildren]="parentStandsForChildren"
			[options]="options"
			[optionKey]="optionKey"
			[(ngModel)]="value"
		/>`,
		imports: [LuMultiSelectInputComponent, TreeSelectDirective, FormsModule],
		changeDetection: ChangeDetectionStrategy.OnPush,
	})
	class HostComponent {
		readonly options = tree;
		readonly optionKey = (node: TreeNodeEntity) => node.id;
		readonly groupingFn = (node: TreeNodeEntity): TreeNodeEntity | null => tree.find((candidate) => candidate.id === node.parentId) ?? null;
		value: TreeNodeEntity[] = [];
		collapsible = false;
		parentStandsForChildren = false;
	}

	let fixture: ComponentFixture<HostComponent>;
	let overlayContainerElement: HTMLElement;

	function openPanel(): void {
		fixture.detectChanges();
		const select = fixture.debugElement.children[0].componentInstance as LuMultiSelectInputComponent<TreeNodeEntity>;
		select.openPanel();
		fixture.detectChanges();
		tick(20);
		fixture.detectChanges();
	}

	const KEY_CODES: Record<string, number> = { ArrowLeft: 37, ArrowRight: 39, ArrowDown: 40 };

	function pressKey(key: string): KeyboardEvent {
		const host = fixture.debugElement.children[0].nativeElement as HTMLElement;
		// CDK's ActiveDescendantKeyManager reads event.keyCode, which happy-dom won't infer from `key`.
		const event = new KeyboardEvent('keydown', { key, keyCode: KEY_CODES[key], bubbles: true, cancelable: true });
		host.dispatchEvent(event);
		fixture.detectChanges();
		tick();
		fixture.detectChanges();
		return event;
	}

	function disclosureOf(row: HTMLElement): HTMLElement {
		return row.querySelector<HTMLElement>('.listboxOption-content-disclosure')!;
	}

	function rootRow(): HTMLElement {
		return overlayContainerElement.querySelectorAll<HTMLElement>('lu-select-option')[0].querySelector('lu-listbox-option')!;
	}

	function clickBranchRoot(): void {
		// The first option is the root of the "Red" branch, its children are nested inside
		overlayContainerElement.querySelector<HTMLElement>('lu-select-option')!.click();
		fixture.detectChanges();
		tick();
		fixture.detectChanges();
	}

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HostComponent] });
		fixture = TestBed.createComponent(HostComponent);
		overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
	});

	it('should select then unselect a whole branch when its root is clicked', fakeAsync(() => {
		fixture.detectChanges();
		const select = fixture.debugElement.children[0].componentInstance as LuMultiSelectInputComponent<TreeNodeEntity>;
		select.openPanel();
		fixture.detectChanges();
		tick(20);
		fixture.detectChanges();

		clickBranchRoot();
		expect(fixture.componentInstance.value).toEqual([red, tomato, radish]);

		clickBranchRoot();
		expect(fixture.componentInstance.value).toEqual([]);
	}));

	it('should fold a branch that holds children when the tree select is collapsible', fakeAsync(() => {
		fixture.componentInstance.collapsible = true;
		openPanel();

		const options = overlayContainerElement.querySelectorAll<HTMLElement>('lu-select-option');
		const root = options[0].querySelector('lu-listbox-option')!;
		expect(disclosureOf(root).getAttribute('aria-expanded')).toBe('false');
		expect(root.querySelector('.listboxOption-content-disclosure')).toBeTruthy();

		// A leaf has nothing to fold, so it gets neither the state nor the chevron
		const leaf = options[1].querySelector('lu-listbox-option')!;
		expect(leaf.querySelector('[aria-expanded]')).toBeNull();
		expect(leaf.querySelector('.listboxOption-content-disclosure')).toBeNull();
	}));

	it('should unfold and fold the highlighted branch with the arrow keys', fakeAsync(() => {
		fixture.componentInstance.collapsible = true;
		openPanel();

		// The first row is highlighted as soon as the panel opens
		expect(disclosureOf(rootRow()).getAttribute('aria-expanded')).toBe('false');

		expect(pressKey('ArrowRight').defaultPrevented).toBe(true);
		expect(disclosureOf(rootRow()).getAttribute('aria-expanded')).toBe('true');

		pressKey('ArrowLeft');
		expect(disclosureOf(rootRow()).getAttribute('aria-expanded')).toBe('false');
	}));

	it('should leave the arrow keys to the caret while a clue is typed', fakeAsync(() => {
		fixture.componentInstance.collapsible = true;
		openPanel();

		const select = fixture.debugElement.children[0].componentInstance as LuMultiSelectInputComponent<TreeNodeEntity>;
		// Set straight on the field rather than through clueChanged, which also resets the highlight:
		// what is pinned here is the guard alone, on an open panel whose first row is highlighted.
		select.clue = 'red';
		fixture.detectChanges();

		expect(select.isPanelOpen).toBe(true);
		// Not consumed: the caret must stay free to move through the text that was typed
		expect(pressKey('ArrowRight').defaultPrevented).toBe(false);
		expect(disclosureOf(rootRow()).getAttribute('aria-expanded')).toBe('false');
	}));

	it('should skip the rows a folded branch hides when navigating down', fakeAsync(() => {
		fixture.componentInstance.collapsible = true;
		openPanel();

		const hosts = overlayContainerElement.querySelectorAll<HTMLElement>('lu-select-option');
		// Red is folded, so Tomato and Radish are hidden and ArrowDown must reach the Blue root
		pressKey('ArrowDown');

		expect(hosts[1].classList).not.toContain('is-highlighted');
		expect(hosts[2].classList).not.toContain('is-highlighted');
		expect(hosts[3].textContent).toContain('Blue');
		expect(hosts[3].classList).toContain('is-highlighted');
	}));

	it('should publish a branch alone when it stands for what it holds', fakeAsync(() => {
		fixture.componentInstance.parentStandsForChildren = true;
		openPanel();

		clickBranchRoot();

		// A rule covers its children, including the ones added later: expanding it into the children
		// known right now would freeze the selection.
		expect(fixture.componentInstance.value).toEqual([red]);
	}));

	it('should show the children a rule covers as checked, without putting them in the value', fakeAsync(() => {
		fixture.componentInstance.parentStandsForChildren = true;
		openPanel();

		clickBranchRoot();

		const child = overlayContainerElement.querySelectorAll<HTMLElement>('lu-select-option')[1].querySelector('lu-listbox-option')!;
		// Covered by the rule, so it reads as checked — and stays actionable, unchecking it breaks the rule
		expect(child.getAttribute('aria-selected')).toBe('true');
		expect(child.getAttribute('aria-disabled')).toBe('false');
		expect(fixture.componentInstance.value).toEqual([red]);
	}));

	it('should break the rule apart when one of the rows it covers is unchecked', fakeAsync(() => {
		fixture.componentInstance.parentStandsForChildren = true;
		openPanel();
		clickBranchRoot();

		// Tomato was covered by the rule; unchecking it turns that rule into the list it stood for,
		// minus the row just unchecked — Radish alone.
		overlayContainerElement.querySelectorAll<HTMLElement>('lu-select-option')[1].click();
		fixture.detectChanges();
		tick();
		fixture.detectChanges();

		expect(fixture.componentInstance.value).toEqual([radish]);
	}));
});
