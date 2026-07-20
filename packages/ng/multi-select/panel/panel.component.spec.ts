import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
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
		const pickerContent = overlayContainerElement.querySelector('.lu-picker-content')!;
		expect(pickerContent.hasAttribute('role')).toBe(false);

		expect(overlayContainerElement.querySelectorAll('lu-select-option').length).toBe(3);
	}));

	it('should render a single checkbox per option and no legacy markup', fakeAsync(() => {
		openPanel();

		const optionHost = overlayContainerElement.querySelector('lu-select-option')!;
		expect(optionHost.getAttribute('role')).toBe('option');
		expect(optionHost.querySelectorAll('.checkboxField').length).toBe(1);
		expect(optionHost.querySelector('.optionItem-value')).toBeNull();
	}));

	it('should reflect selection on host aria-selected and inner is-selected class', fakeAsync(() => {
		component.writeValue([options[1]]);
		openPanel();

		const hosts = Array.from(overlayContainerElement.querySelectorAll('lu-select-option'));
		const selected = hosts.filter((host) => host.getAttribute('aria-selected') === 'true');
		expect(selected.length).toBe(1);
		expect(selected[0].textContent).toContain('Poireau');
		expect(selected[0].querySelector('lu-listbox-option')!.classList).toContain('is-selected');
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
});
