import { Component, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalDirective } from './portal.directive';

@Component({
	selector: 'lu-portal-test',
	standalone: true,
	imports: [PortalDirective],
	template: `
		@if (displayed) {
			<div *luPortal="content; context: context"></div>
		}
		<ng-template #tpl let-value>{{ value }}</ng-template>
	`,
})
class PortalTestComponent {
	content: PortalDirective['luPortal'] | null = null;
	context: PortalDirective['luPortalContext'] | null = null;
	displayed = true;

	contentTpl = viewChild.required<TemplateRef<unknown>>('tpl');
}

@Component({
	selector: 'lu-portal-test-content',
	standalone: true,
	template: 'Component content',
})
class PortalTestContentComponent {}

describe('PortalDirective', () => {
	let host: PortalTestComponent;
	let fixture: ComponentFixture<PortalTestComponent>;
	let hostContent: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [PortalTestComponent],
		});

		fixture = TestBed.createComponent(PortalTestComponent);
		host = fixture.componentInstance;
		hostContent = fixture.debugElement.nativeElement as HTMLElement;
	});

	it('should work with string', () => {
		host.content = 'test';
		fixture.detectChanges();
		expect(hostContent.textContent).toBe('test');
	});

	it('should work with string with updates', () => {
		host.content = 'test1';
		fixture.detectChanges();
		host.content = 'test2';
		fixture.detectChanges();
		expect(hostContent.textContent).toBe('test2');
	});

	it('should clean string when hidding luportal', () => {
		host.content = 'test';
		fixture.detectChanges();
		host.displayed = false;
		fixture.detectChanges();
		expect(hostContent.textContent).toBe('');
	});

	it('should work with component', () => {
		host.content = PortalTestContentComponent;
		fixture.detectChanges();
		expect(hostContent.textContent).toBe('Component content');
	});

	it('should work with string then component', () => {
		host.content = 'test';
		fixture.detectChanges();
		host.content = PortalTestContentComponent;
		fixture.detectChanges();
		expect(hostContent.textContent).toBe('Component content');
	});

	it('should work with templateRef with context updates', () => {
		// Arrange
		host.content = host.contentTpl();
		host.context = { $implicit: 'test' };
		fixture.detectChanges();

		// Act
		const firstText = hostContent.textContent;
		host.context = { $implicit: 'test2' };
		fixture.detectChanges();

		// Assert
		expect(firstText).toBe('test');
		expect(hostContent.textContent).toBe('test2');
	});
});
