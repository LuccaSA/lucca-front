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
		expect(announce).toHaveBeenCalledExactlyOnceWith('4 items selected', 'polite');
	});

	it('should select a range upwards', () => {
		// Act
		click(8);
		click(4, true);

		// Assert
		expect(itemStates()).toEqual([false, false, true, true, true, true]);
	});

	it('should leave the items of a collapsed group unchanged', () => {
		// Arrange
		host.groupBExpanded.set(false);
		fixture.detectChanges();

		// Act
		click(2);
		click(8, true);

		// Assert
		expect(itemStates()).toEqual([true, true, true, false, false, true]);
	});

	it('should not use the group checkbox as an anchor', () => {
		// Act
		click(1);
		click(6, true);

		// Assert
		expect(itemStates()).toEqual([true, true, true, true, false, false]);
		expect(announce).not.toHaveBeenCalled();
	});
});
