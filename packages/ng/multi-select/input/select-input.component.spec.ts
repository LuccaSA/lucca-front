import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, NgControl } from '@angular/forms';
import { runALuSelectInputComponentTestSuite } from '../../core-select/input/select-input.component.spec';
import { LuMultiSelectInputComponent } from './select-input.component';

type Entity = { id: number; name: string };

describe('LuMultiSelectInputComponent', () => {
	let fixture: ComponentFixture<LuMultiSelectInputComponent<Entity>>;
	let searchControl: FormControl;

	beforeEach(() => {
		searchControl = new FormControl();

		TestBed.configureTestingModule({
			imports: [LuMultiSelectInputComponent],
			providers: [
				// The input inside the displayer needs a NgControl
				{
					provide: NgControl,
					useValue: searchControl,
				},
			],
		});

		fixture = TestBed.createComponent<LuMultiSelectInputComponent<Entity>>(LuMultiSelectInputComponent);
		fixture.detectChanges();
	});

	runALuSelectInputComponentTestSuite<Entity[]>({
		getFixture: () => fixture,
		exampleValue: [{ id: 1, name: 'test' }],
		emptyValue: [],
		clearerSelector: '.multipleSelect-clear',
	});
});
