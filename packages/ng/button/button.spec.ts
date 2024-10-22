import { fakeAsync, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './public-api';

describe('ButtonComponent in LF', () => {
	let button: ButtonComponent;

	beforeEach(fakeAsync(() => {
		TestBed.configureTestingModule({
			imports: [ButtonComponent],
		}).compileComponents();
		button = TestBed.createComponent(ButtonComponent).componentInstance;
	}));

	it('Should init properly', () => {
		expect(button).not.toBeUndefined();
	});
});
