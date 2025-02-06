import { ComponentFixture, TestBed } from '@angular/core/testing';
import { runALuSelectInputComponentTestSuite } from '../../core-select/input/select-input.component.spec';
import { LuSimpleSelectInputComponent } from './select-input.component';

type Entity = { id: number; name: string };

describe('LuSimpleSelectInputComponent', () => {
	let fixture: ComponentFixture<LuSimpleSelectInputComponent<Entity>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [LuSimpleSelectInputComponent],
		});

		fixture = TestBed.createComponent<LuSimpleSelectInputComponent<Entity>>(LuSimpleSelectInputComponent);
		fixture.detectChanges();
	});

	runALuSelectInputComponentTestSuite<Entity>({
		getFixture: () => fixture,
		exampleValue: { id: 1, name: 'test' },
		emptyValue: null,
		clearerSelector: '.simpleSelect-field-clear',
	});
});
