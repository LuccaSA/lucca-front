import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterPillComponent } from './filter-pill.component';

@Component({
	template: `<lu-filter-pill label="Test"><div class="content">hello</div></lu-filter-pill>`,
	imports: [FilterPillComponent],
})
class HostComponent {}

describe('FilterPillComponent: clicking the trigger toggles the popover', () => {
	let fixture: ComponentFixture<HostComponent>;
	let pill: FilterPillComponent;

	function triggerButton(): HTMLButtonElement {
		return fixture.nativeElement.querySelector('button.filterPill') as HTMLButtonElement;
	}

	function clickTrigger(): void {
		triggerButton().click();
		fixture.detectChanges();
		tick(50);
		fixture.detectChanges();
	}

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HostComponent] });
		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
		pill = fixture.debugElement.query(By.directive(FilterPillComponent)).componentInstance;
	});

	afterEach(() => {
		TestBed.inject(OverlayContainer).getContainerElement().remove();
	});

	it('opens on first click and closes on the second click', fakeAsync(() => {
		clickTrigger();
		expect(pill.popoverRef()!.opened()).toBe(true);

		clickTrigger();
		expect(pill.popoverRef()!.opened()).toBe(false);
	}));
});
