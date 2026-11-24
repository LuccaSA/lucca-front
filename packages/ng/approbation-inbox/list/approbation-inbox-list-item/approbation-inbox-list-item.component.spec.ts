import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ApprobationInboxGroupComponent } from '../approbation-inbox-list-group/approbation-inbox-list-group.component';
import { ApprobationInboxListComponent } from '../approbation-inbox-list/approbation-inbox-list.component';
import { ApprobationInboxItemComponent } from './approbation-inbox-list-item.component';

@Component({
	selector: 'lu-approbation-inbox-list-item-test',
	imports: [ApprobationInboxListComponent, ApprobationInboxGroupComponent, ApprobationInboxItemComponent],
	template: `
		<lu-approbation-inbox-list selectable [detailsComponent]="$any(null)">
			<lu-approbation-inbox-list-group label="Group A">
				@for (item of groupA; track $index) {
					<lu-approbation-inbox-list-item [(checked)]="item.checked"
						><span approbationInboxListItemTitle>A{{ $index }}</span></lu-approbation-inbox-list-item
					>
				}
			</lu-approbation-inbox-list-group>
			<lu-approbation-inbox-list-group label="Group B" [expanded]="groupBExpanded()">
				@for (item of groupB; track $index) {
					<lu-approbation-inbox-list-item [(checked)]="item.checked"
						><span approbationInboxListItemTitle>B{{ $index }}</span></lu-approbation-inbox-list-item
					>
				}
			</lu-approbation-inbox-list-group>
			<lu-approbation-inbox-list-item [(checked)]="last.checked"><span approbationInboxListItemTitle>Last</span></lu-approbation-inbox-list-item>
		</lu-approbation-inbox-list>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	readonly groupA = Array.from({ length: 3 }, () => ({ checked: signal(false) }));
	readonly groupB = Array.from({ length: 2 }, () => ({ checked: signal(false) }));
	readonly last = { checked: signal(false) };
	readonly groupBExpanded = signal(true);
}

// Checkbox indexes: 0 "select all", 1 group A, 2-4 items of group A, 5 group B, 6-7 items of group B, 8 last item
describe(ApprobationInboxItemComponent.name, () => {
	let fixture: ComponentFixture<HostComponent>;
	let host: HostComponent;
	let announce: ReturnType<typeof vi.fn>;

	function click(index: number, shiftKey = false) {
		const checkboxes = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
		// The browser toggles the checkbox and then dispatches `input` and `change`
		checkboxes[index].dispatchEvent(new MouseEvent('click', { bubbles: true, shiftKey }));
		fixture.detectChanges();
	}

	function itemStates() {
		return [...host.groupA, ...host.groupB, host.last].map((item) => item.checked());
	}

	beforeEach(async () => {
		announce = vi.fn().mockResolvedValue(undefined);
		TestBed.configureTestingModule({
			imports: [HostComponent],
			providers: [{ provide: LiveAnnouncer, useValue: { announce } }],
		});
		fixture = TestBed.createComponent(HostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
		// ngModel writes its initial value asynchronously
		await fixture.whenStable();
	});

	it('should select the items between the anchor and the Shift + clicked item, across groups', () => {
		// Act
		click(3);
		click(7, true);

		// Assert
		expect(itemStates()).toEqual([false, true, true, true, true, false]);
		expect(announce).toHaveBeenCalledExactlyOnceWith('You just selected 3 items', 'polite');
	});

	it('should select a range upwards', () => {
		// Act
		click(8);
		click(4, true);

		// Assert
		expect(itemStates()).toEqual([false, false, true, true, true, true]);
	});

	it('should change the items of a collapsed group', () => {
		// Arrange
		host.groupBExpanded.set(false);
		fixture.detectChanges();

		// Act
		click(2);
		click(8, true);

		// Assert
		expect(itemStates()).toEqual([true, true, true, true, true, true]);
	});

	it('should start a range from a group checkbox, at its position', () => {
		// Act
		click(1);
		click(7, true);

		// Assert
		expect(itemStates()).toEqual([true, true, true, true, true, false]);
		expect(announce).toHaveBeenCalledExactlyOnceWith('You just selected 2 items', 'polite');
	});

	it('should start a range upwards from a group checkbox', () => {
		// Act
		click(5);
		click(2, true);

		// Assert
		expect(itemStates()).toEqual([true, true, true, true, true, false]);
		expect(announce).toHaveBeenCalledExactlyOnceWith('You just selected 3 items', 'polite');
	});

	it('should end a range on a group checkbox, which also changes its own items', () => {
		// Act
		click(2);
		click(5, true);

		// Assert
		expect(itemStates()).toEqual([true, true, true, true, true, false]);
		expect(announce).toHaveBeenCalledExactlyOnceWith('You just selected 4 items', 'polite');
	});

	it('should preview on the checkboxes the items a Shift + click on the hovered item would change, while Shift is held', () => {
		// Arrange
		click(3);
		const items = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('lu-approbation-inbox-list-item'));
		// Indexes of the items whose checkbox previews a selection
		const previewed = () => items.flatMap((item, index) => (item.classList.contains('is-rangeWillCheck') ? [index] : []));
		items[3].querySelector('lu-form-field')?.dispatchEvent(new PointerEvent('pointerenter'));

		// Act
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift', shiftKey: true }));
		fixture.detectChanges();
		const whileShiftHeld = previewed();
		document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Shift', shiftKey: false }));
		fixture.detectChanges();

		// Assert
		expect(whileShiftHeld).toEqual([2, 3]);
		expect(previewed()).toEqual([]);
		expect((fixture.nativeElement as HTMLElement).querySelector('.is-rangeWillUncheck')).toBeNull();
	});

	it('should preview the state the group and "select all" checkboxes would get from their items', () => {
		// Arrange
		click(2);
		click(3);
		click(4);
		const element = fixture.nativeElement as HTMLElement;
		const items = Array.from(element.querySelectorAll('lu-approbation-inbox-list-item'));
		const preview = (selector: string) =>
			Array.from(element.querySelectorAll(selector)).map((checkbox) =>
				checkbox.classList.contains('is-rangeWillCheck') ? 'check' : checkbox.classList.contains('is-rangeWillMix') ? 'mix' : checkbox.classList.contains('is-rangeWillUncheck') ? 'uncheck' : null,
			);
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift', shiftKey: true }));

		// Act
		items[5].querySelector('lu-form-field')?.dispatchEvent(new PointerEvent('pointerenter'));
		fixture.detectChanges();
		const toLastItem = [preview('.approbationInbox-list-formSelectionOptional-formfield'), preview('.approbationInbox-list-content-groupOptional-header')];
		items[3].querySelector('lu-form-field')?.dispatchEvent(new PointerEvent('pointerenter'));
		fixture.detectChanges();
		const toFirstItemOfGroupB = [preview('.approbationInbox-list-formSelectionOptional-formfield'), preview('.approbationInbox-list-content-groupOptional-header')];
		document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Shift', shiftKey: false }));

		// Assert
		expect(toLastItem).toEqual([['check'], [null, 'check']]);
		expect(toFirstItemOfGroupB).toEqual([[null], [null, 'mix']]);
	});

	it('should start a range from the last clicked group checkbox, its items included downwards', () => {
		// Act
		click(2);
		click(1);
		click(1);
		click(8, true);

		// Assert
		expect(itemStates()).toEqual([true, true, true, true, true, true]);
		expect(announce).toHaveBeenCalledExactlyOnceWith('You just selected 6 items', 'polite');
	});

	it('should start a range from the first item after the "select all" checkbox, not from an item clicked before it', async () => {
		// Act
		click(7);
		click(0);
		// ngModel writes the new state of the item checkboxes asynchronously
		await fixture.whenStable();
		click(4, true);

		// Assert
		expect(itemStates()).toEqual([false, false, false, true, true, true]);
		expect(announce).toHaveBeenCalledExactlyOnceWith('You just unselected 3 items', 'polite');
	});
});
