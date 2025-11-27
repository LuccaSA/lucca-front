import { ChangeDetectionStrategy, Component, input, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalContent } from './portal-content';
import { PortalDirective } from './portal.directive';

@Component({
	selector: 'lu-portal-test',
	imports: [PortalDirective],
	template: `
		@if (displayed()) {
			<div *luPortal="content(); context: context()"></div>
		}
		<ng-template #tpl let-value>{{ value }}</ng-template>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PortalTestComponent {
	context = input<PortalDirective['luPortalContext'] | null>(null);
	content = input<PortalContent | null>(null);
	displayed = input(true);

	contentTpl = viewChild.required<TemplateRef<unknown>>('tpl');
}

@Component({
	selector: 'lu-portal-test-content',
	template: 'Component content',
	changeDetection: ChangeDetectionStrategy.OnPush,
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
		fixture.componentRef.setInput('content', 'test');
		fixture.detectChanges();
		expect(hostContent.textContent).toBe('test');
	});

	it('should work with string with updates', () => {
		fixture.componentRef.setInput('content', 'test1');
		fixture.detectChanges();
		fixture.componentRef.setInput('content', 'test2');
		fixture.detectChanges();
		expect(hostContent.textContent).toBe('test2');
	});

	it('should clean string when hidding luportal', () => {
		fixture.componentRef.setInput('content', 'test');
		fixture.detectChanges();
		fixture.componentRef.setInput('displayed', false);
		fixture.detectChanges();
		expect(hostContent.textContent).toBe('');
	});

	it('should work with component', () => {
		fixture.componentRef.setInput('content', PortalTestContentComponent);
		fixture.detectChanges();
		expect(hostContent.textContent).toBe('Component content');
	});

	it('should work with string then component', () => {
		fixture.componentRef.setInput('content', 'test');
		fixture.detectChanges();

		fixture.componentRef.setInput('content', PortalTestContentComponent);
		fixture.detectChanges();
		expect(hostContent.textContent).toBe('Component content');
	});

	it('should work with templateRef with context updates', () => {
		// Arrange
		fixture.componentRef.setInput('content', host.contentTpl());
		fixture.componentRef.setInput('context', { $implicit: 'test' });

		fixture.detectChanges();

		// Act
		const firstText = hostContent.textContent;
		fixture.componentRef.setInput('context', { $implicit: 'test2' });
		fixture.detectChanges();

		// Assert
		expect(firstText).toBe('test');
		expect(hostContent.textContent).toBe('test2');
	});
});
