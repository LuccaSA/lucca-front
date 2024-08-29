import { Component, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SELECT_LABEL, SELECT_LABEL_ID } from '../select.model';
import { ALuSelectInputComponent } from './select-input.component';

interface TestEntity {
	id: number;
	name: string;
}

@Component({
	selector: 'lu-select-input-test',
	standalone: true,
	template: '',
})
export class LuSelectInputTestComponent extends ALuSelectInputComponent<TestEntity, TestEntity> {
	protected override get hasValue(): boolean {
		return !!this.value;
	}

	protected override buildPanelRef(): this['panelRef'] {
		return {
			close: () => {},
			closed: new EventEmitter<void>(),
			valueChanged: new EventEmitter<TestEntity>(),
			previousPage: new EventEmitter<void>(),
			nextPage: new EventEmitter<void>(),
			activeOptionIdChanged: new EventEmitter<string>(),
		} as this['panelRef'];
	}
}

describe('ALuSelectInputComponent', () => {
	let fixture: ComponentFixture<LuSelectInputTestComponent>;
	let component: LuSelectInputTestComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [LuSelectInputTestComponent],
			providers: [
				{ provide: SELECT_LABEL, useValue: undefined },
				{ provide: SELECT_LABEL_ID, useValue: 'label-id' },
			],
		});
		fixture = TestBed.createComponent(LuSelectInputTestComponent);
		component = fixture.componentInstance;
	});

	describe('panelOpened / panelClosed', () => {
		let panelClosedEvents: number;
		let panelOpenedEvents: number;

		beforeEach(() => {
			panelClosedEvents = 0;
			panelOpenedEvents = 0;
			component.panelClosed.subscribe(() => panelClosedEvents++);
			component.panelOpened.subscribe(() => panelOpenedEvents++);
		});

		it('should not emits on init', () => {
			// Assert
			expect(panelOpenedEvents).toBe(0);
			expect(panelClosedEvents).toBe(0);
		});

		it('should emit on open', () => {
			// Act
			component.openPanel();

			// Assert
			expect(panelOpenedEvents).toBe(1);
			expect(panelClosedEvents).toBe(0);
		});

		it('should emit on close', () => {
			// Act
			component.openPanel();
			component.closePanel();

			// Assert
			expect(panelOpenedEvents).toBe(1);
			expect(panelClosedEvents).toBe(1);
		});
	});
});
