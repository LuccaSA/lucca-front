import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
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
	const tree = [red, tomato, radish];

	@Component({
		template: `<lu-multi-select [treeSelect]="groupingFn" [options]="options" [optionKey]="optionKey" [(ngModel)]="value" />`,
		imports: [LuMultiSelectInputComponent, TreeSelectDirective, FormsModule],
		changeDetection: ChangeDetectionStrategy.OnPush,
	})
	class HostComponent {
		readonly options = tree;
		readonly optionKey = (node: TreeNodeEntity) => node.id;
		readonly groupingFn = (node: TreeNodeEntity): TreeNodeEntity | null => tree.find((candidate) => candidate.id === node.parentId) ?? null;
		value: TreeNodeEntity[] = [];
	}

	let fixture: ComponentFixture<HostComponent>;
	let overlayContainerElement: HTMLElement;

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
});
