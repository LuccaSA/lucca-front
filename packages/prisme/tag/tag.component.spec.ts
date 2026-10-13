import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TagComponent } from './tag.component';

describe('TagComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TagComponent],
			providers: [provideRouter([])],
		}).compileComponents();
	});

	it.each`
		withEllipsis | link         | constrained
		${false}     | ${undefined} | ${false}
		${true}      | ${undefined} | ${true}
		${true}      | ${'/'}       | ${false}
	`('should constrain the host width: $constrained when withEllipsis is $withEllipsis and link is $link', ({ withEllipsis, link, constrained }) => {
		const fixture = TestBed.createComponent(TagComponent);
		fixture.componentRef.setInput('label', 'Text');
		fixture.componentRef.setInput('withEllipsis', withEllipsis);
		fixture.componentRef.setInput('link', link);
		fixture.detectChanges();

		expect(fixture.nativeElement.classList.contains('mod-withEllipsis')).toBe(constrained);
	});
});
