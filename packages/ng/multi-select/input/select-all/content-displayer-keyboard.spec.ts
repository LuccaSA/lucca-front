import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgControl } from '@angular/forms';
import { isNotNil } from '@lucca-front/ng/core';
import { ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { By } from '@angular/platform-browser';
import { LuMultiSelectContentDisplayerComponent } from '../../displayer/content-displayer/content-displayer.component';
import { LuMultiSelectDefaultDisplayerComponent } from '../../displayer/default-displayer.component';
import { LuMultiDisplayerDirective } from '../../displayer/displayer.directive';
import { LuMultiSelectInputComponent } from '../select-input.component';

interface Entity {
	id: number;
	name: string;
}

const options: Entity[] = [
	{ id: 1, name: 'test 1' },
	{ id: 2, name: 'test 2' },
	{ id: 3, name: 'test 3' },
	{ id: 4, name: 'test 4' },
	{ id: 5, name: 'test 5' },
];

// Mirrors the `AllAsDefaultValue` / "With ContentDisplayer" story: the displayer swaps
// between the content-displayer (empty selection) and the default displayer (has value),
// each carrying its OWN <input luMultiSelectDisplayerInput>. The first selection flips
// `values.length === 0`, destroying the focused input.
@Component({
	selector: 'lu-host',
	imports: [FormsModule, LuMultiSelectInputComponent, LuMultiDisplayerDirective, ɵLuOptionOutletDirective, LuMultiSelectContentDisplayerComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-multi-select #selectRef [(ngModel)]="selected" [options]="options">
			<ng-container *luMultiDisplayer="let values; select: selectRef">
				@if (values.length === 0) {
					<lu-multi-select-content-displayer>All</lu-multi-select-content-displayer>
				} @else {
					<ng-container *luOptionOutlet="valuesTpl; value: values || []" />
				}
			</ng-container>
		</lu-multi-select>
	`,
})
class HostComponent {
	selected: Entity[] = [];
	options = options;
	valuesTpl = LuMultiSelectDefaultDisplayerComponent;
}

async function waitForPanel(select: LuMultiSelectInputComponent<Entity>) {
	return vi.waitUntil(() => isNotNil(select.panelRef));
}

// Regression #10: with a swapping displayer, keyboard navigation used to die after the first
// selection. The focused input was destroyed by the displayer swap while focusInput$ (a plain
// Subject) had already emitted, so focus fell to <body> and further keydowns never reached the
// select's host listener.
describe('ContentDisplayer: keyboard survives the displayer swap on first selection (regression #10)', () => {
	let fixture: ComponentFixture<HostComponent>;
	let select: LuMultiSelectInputComponent<Entity>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HostComponent],
			providers: [{ provide: NgControl, useValue: new FormControl() }],
		});
		fixture = TestBed.createComponent(HostComponent);
		document.body.appendChild(fixture.nativeElement);
		fixture.detectChanges();
		select = fixture.debugElement.query(By.directive(LuMultiSelectInputComponent)).componentInstance;
	});

	afterEach(() => {
		fixture.nativeElement.remove();
	});

	function input(): HTMLInputElement | null {
		return fixture.nativeElement.querySelector('input[role="combobox"]');
	}

	function sync(): void {
		fixture.detectChanges();
		select.panelRef?.changeDetectorRef?.detectChanges();
	}

	const KEY_CODES: Record<string, number> = { ArrowDown: 40, ArrowUp: 38, Enter: 13 };

	function press(key: string): void {
		// CDK's ActiveDescendantKeyManager reads event.keyCode, which happy-dom won't infer from `key`.
		(document.activeElement ?? input())!.dispatchEvent(new KeyboardEvent('keydown', { key, keyCode: KEY_CODES[key], bubbles: true, cancelable: true }));
		sync();
	}

	function focusInsideHost(): boolean {
		const el = document.activeElement;
		return !!el && el !== document.body && fixture.nativeElement.contains(el);
	}

	function activeItemIndex(): number {
		return (select.panelRef as unknown as { instance: { keyManager: { activeItemIndex: number } } }).instance.keyManager.activeItemIndex;
	}

	it('keeps focus in the select and the key manager responsive after the first selection', async () => {
		select.openPanel();
		await waitForPanel(select);
		sync();

		input()!.focus();
		sync();
		expect(focusInsideHost()).toBe(true);

		press('ArrowDown'); // highlight the first option
		expect(activeItemIndex()).toBe(1);

		press('Enter'); // first selection → values 0 -> 1 → displayer swaps out the focused input
		expect(select.value?.length).toBe(1);
		// The regression: focus fell to <body>. It must stay on the new displayer's input.
		expect(focusInsideHost()).toBe(true);

		// And the keyboard must still drive the key manager.
		press('ArrowDown');
		expect(select.isPanelOpen).toBe(true);
		expect(activeItemIndex()).toBe(2);
	});
});
