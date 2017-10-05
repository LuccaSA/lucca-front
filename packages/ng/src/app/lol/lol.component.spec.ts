import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { LuLolComponent } from './lol.component';

describe('LuLolComponent', () => {
	let component: LuLolComponent;
	let fixture: ComponentFixture<LuLolComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LuLolComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LuLolComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
