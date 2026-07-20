import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LuSimpleSelectInputComponent } from '../input/select-input.component';

type Entity = { id: number; name: string };

describe('LuSelectPanelComponent (listbox rendering)', () => {
	let fixture: ComponentFixture<LuSimpleSelectInputComponent<Entity>>;
	let component: LuSimpleSelectInputComponent<Entity>;
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
			imports: [LuSimpleSelectInputComponent],
		});

		fixture = TestBed.createComponent<LuSimpleSelectInputComponent<Entity>>(LuSimpleSelectInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
	});

	it('should render options inside a lu-listbox', fakeAsync(() => {
		openPanel();

		const listbox = overlayContainerElement.querySelector('lu-listbox')!;
		expect(listbox).toBeTruthy();
		expect(listbox.getAttribute('role')).toBe('listbox');
		expect(listbox.classList).toContain('listboxOptionWrapper');

		const renderedOptions = overlayContainerElement.querySelectorAll('lu-select-option');
		expect(renderedOptions.length).toBe(3);
		expect(overlayContainerElement.textContent).toContain('Carotte');
	}));

	it('should keep option semantics on the panel element host and none on the inner listbox option', fakeAsync(() => {
		openPanel();

		const optionHost = overlayContainerElement.querySelector('lu-select-option')!;
		expect(optionHost.getAttribute('role')).toBe('option');
		expect(optionHost.getAttribute('id')).toBeTruthy();
		expect(optionHost.hasAttribute('aria-selected')).toBe(true);

		const listboxOption = optionHost.querySelector('lu-listbox-option')!;
		expect(listboxOption).toBeTruthy();
		expect(listboxOption.hasAttribute('role')).toBe(false);
		expect(listboxOption.hasAttribute('aria-checked')).toBe(false);
		expect(listboxOption.hasAttribute('aria-selected')).toBe(false);
	}));

	it('should reflect selection with aria-selected on host and is-selected class on listbox option', fakeAsync(() => {
		component.writeValue(options[1]);
		openPanel();

		const hosts = Array.from(overlayContainerElement.querySelectorAll('lu-select-option'));
		const selectedHost = hosts.find((host) => host.getAttribute('aria-selected') === 'true')!;
		expect(selectedHost.textContent).toContain('Poireau');
		expect(selectedHost.querySelector('lu-listbox-option')!.classList).toContain('is-selected');
	}));

	it('should bridge keyboard highlight to the is-hovered visual state', fakeAsync(() => {
		openPanel();
		tick();
		fixture.detectChanges();

		// The key manager highlights the first option on init
		const firstOption = overlayContainerElement.querySelector('lu-select-option')!;
		expect(firstOption.classList).toContain('is-highlighted');
		expect(firstOption.querySelector('.listboxOption-content')!.classList).toContain('is-hovered');
	}));

	it('should display the empty state through the listbox status option', fakeAsync(() => {
		openPanel([]);

		const listbox = overlayContainerElement.querySelector('lu-listbox')!;
		const emptyOption = listbox.querySelector('lu-listbox-option[aria-hidden="true"]')!;
		expect(emptyOption).toBeTruthy();
		expect(listbox.getAttribute('aria-describedby')).toBe(emptyOption.getAttribute('id'));
	}));

	it('should render groups as listbox group options with deterministic label ids', fakeAsync(() => {
		component.grouping = { selector: (option) => (option.id < 3 ? 'Racines' : 'Autres'), content: 'Groupe' };
		openPanel();

		const groups = overlayContainerElement.querySelectorAll('lu-listbox-option[role="group"]');
		expect(groups.length).toBe(2);

		const firstGroup = groups[0];
		const labelId = firstGroup.getAttribute('aria-labelledby')!;
		expect(labelId).toContain('-group-Racines');
		expect(firstGroup.querySelector(`[id="${labelId}"]`)).toBeTruthy();
		expect(firstGroup.querySelectorAll('lu-select-option[role="option"]').length).toBe(2);
		expect(firstGroup.querySelector('[optgroup]')!.classList).toContain('listboxOptionWrapper');
	}));

	it('should render the add option as a listbox option outside the listbox, visible even when empty', fakeAsync(() => {
		const onAddOption = vi.fn();
		component.addOption.subscribe(onAddOption);
		fixture.componentRef.setInput('addOptionStrategy', 'always');
		openPanel([]);

		const addOption = overlayContainerElement.querySelector<HTMLElement>('lu-listbox-option.mod-add')!;
		expect(addOption).toBeTruthy();
		// It must stay outside the lu-listbox so the empty state does not hide it
		expect(addOption.closest('lu-listbox')).toBeNull();
		expect(addOption.getAttribute('role')).toBe('option');
		expect(addOption.getAttribute('id')).toBe('picker-content-add');
		expect(addOption.hasAttribute('aria-checked')).toBe(false);

		addOption.click();
		expect(onAddOption).toHaveBeenCalled();
	}));

	it('should render tree branches with the listbox visuals', fakeAsync(() => {
		component.treeGenerator = {
			generateTrees: (items) => [{ node: items[0], children: [{ node: items[1] }, { node: items[2] }] }],
		};
		openPanel();

		const branches = overlayContainerElement.querySelectorAll('lu-tree-branch');
		expect(branches.length).toBe(3);

		const hosts = overlayContainerElement.querySelectorAll('lu-select-option');
		expect(hosts.length).toBe(3);
		hosts.forEach((host) => {
			expect(host.getAttribute('role')).toBe('option');
			expect(host.querySelector('lu-listbox-option')).toBeTruthy();
			expect(host.querySelector('.optionItem-value')).toBeNull();
		});

		// Nested branches keep the depth variable driving the listbox content indentation
		const nested = overlayContainerElement.querySelectorAll('lu-tree-branch lu-tree-branch lu-select-option');
		expect(nested.length).toBe(2);
		expect((nested[0] as HTMLElement).style.getPropertyValue('--components-treeBranch-level')).toBe('2');
	}));

	it('should emit the clicked option as new value', fakeAsync(() => {
		const onChange = vi.fn();
		component.registerOnChange(onChange);
		openPanel();

		const hosts = overlayContainerElement.querySelectorAll<HTMLElement>('lu-select-option');
		hosts[2].click();
		fixture.detectChanges();

		expect(onChange).toHaveBeenCalledWith(options[2]);
	}));
});
