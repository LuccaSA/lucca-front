import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderComponent } from './page-header.component';

//TODO implement unit tests? Or maybe use e2e instead? TBD
describe('PageHeaderComponent', () => {
	let component: PageHeaderComponent;
	let fixture: ComponentFixture<PageHeaderComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [PageHeaderComponent],
		});
		fixture = TestBed.createComponent(PageHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
