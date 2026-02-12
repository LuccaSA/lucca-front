import { TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
	let button: ButtonComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ButtonComponent],
		}).compileComponents();
		button = TestBed.createComponent(ButtonComponent).componentInstance;
	});

	it('Should init properly', () => {
		expect(button).not.toBeUndefined();
	});
});
