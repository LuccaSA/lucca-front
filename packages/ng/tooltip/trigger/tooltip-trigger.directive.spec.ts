import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LuTooltipModule } from '../tooltip.module';
import { LuTooltipTriggerDirective } from './tooltip-trigger.directive';

@Component({
	standalone: true,
	imports: [LuTooltipModule],
	selector: 'lu-test',
	template: `<div id="with-tooltip" [luTooltip]="content"></div>`,
})
export class LuTestComponent {
	content: string | SafeHtml = '';
}

describe('LuTooltipTriggerDirective', () => {
	let component: LuTestComponent;
	let fixture: ComponentFixture<LuTestComponent>;
	let tooltipTrigger: LuTooltipTriggerDirective;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LuTestComponent, NoopAnimationsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LuTestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		tooltipTrigger = fixture.debugElement.query(By.directive(LuTooltipTriggerDirective)).injector.get(LuTooltipTriggerDirective);
	});

	it('should not append unsafe html in dom', fakeAsync(() => {
		// Arrange
		component.content = '<img src="null" onerror="hack()">';

		// Act
		tooltipTrigger.onMouseEnter();
		tick(tooltipTrigger.enterDelay);
		fixture.detectChanges();

		// Assert
		const images = fixture.debugElement.queryAll(By.css('img')).map((el) => (el.nativeElement instanceof HTMLElement ? el.nativeElement : null));

		expect(images.length).toBe(1);
		expect(images[0].getAttribute('onerror')).toBe(null);
	}));

	it('should allow trusted html', fakeAsync(() => {
		// Arrange
		const sanitizer = TestBed.inject(DomSanitizer);
		component.content = sanitizer.bypassSecurityTrustHtml('<img src="null" onerror="hack()">');

		// Act
		tooltipTrigger.onMouseEnter();
		tick(tooltipTrigger.enterDelay);
		fixture.detectChanges();

		// Assert
		const images = fixture.debugElement.queryAll(By.css('img')).map((el) => (el.nativeElement instanceof HTMLElement ? el.nativeElement : null));

		expect(images.length).toBe(1);
		expect(images[0].getAttribute('onerror')).toBe('hack()');
	}));
});
