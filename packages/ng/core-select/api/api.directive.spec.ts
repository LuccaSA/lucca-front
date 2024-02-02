import { Component, Directive } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { Observable, map, of } from 'rxjs';
import { MAGIC_OPTION_SCROLL_DELAY } from '../option/option.component';
import { ALuCoreSelectApiDirective, MAGIC_DEBOUNCE_DURATION } from './api.directive';

interface TestEntity {
	id: number;
	name: string;
}

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[testApi]',
	standalone: true,
})
class TestDirective extends ALuCoreSelectApiDirective<TestEntity> {
	protected override params$ = this.clue$.pipe(
		map((clue) => ({
			...(clue ? { clue } : {}),
		})),
	);

	protected override optionComparer = (a: TestEntity, b: TestEntity) => a.id === b.id;

	public override getOptions(): Observable<TestEntity[]> {
		return of([{ id: 1, name: 'test' }]);
	}
}

@Component({
	template: ` <lu-simple-select testApi></lu-simple-select> `,
	standalone: true,
	imports: [TestDirective, LuSimpleSelectInputComponent],
})
class HostComponent {}

describe('ALuCoreSelectApiDirective', () => {
	let spectator: Spectator<HostComponent>;
	let select: LuSimpleSelectInputComponent<TestEntity>;
	let testApi: TestDirective;

	const createComponent = createComponentFactory<HostComponent>({
		component: HostComponent,
	});

	beforeEach(() => {
		spectator = createComponent({ detectChanges: false });
		testApi = spectator.query(TestDirective);
		select = spectator.query<LuSimpleSelectInputComponent<TestEntity>>(LuSimpleSelectInputComponent);
		jest.spyOn(testApi, 'getOptions');
	});

	it('should query options when clicking on the select', fakeAsync(() => {
		spectator.click('lu-simple-select');
		spectator.tick(MAGIC_OPTION_SCROLL_DELAY); // Avoid "1 periodic timer(s) still in the queue." because of the setTimeout in the option component

		expect(testApi.getOptions).toHaveBeenCalledTimes(1);
		expect(testApi.getOptions).toHaveBeenCalledWith({}, 0);
	}));

	it('should query options when ArrowDown keydown on the select', fakeAsync(() => {
		spectator.dispatchKeyboardEvent('lu-simple-select', 'keydown', 'ArrowDown');
		spectator.tick(MAGIC_OPTION_SCROLL_DELAY); // Avoid "1 periodic timer(s) still in the queue." because of the setTimeout in the option component

		expect(testApi.getOptions).toHaveBeenCalledTimes(1);
		expect(testApi.getOptions).toHaveBeenCalledWith({}, 0);
	}));

	it('should query options once when searching while the select is closed', fakeAsync(() => {
		spectator.tick(); // Component initialization uses a setTimeout :see_no_evil:
		select.clueChanged('test');
		spectator.tick(MAGIC_DEBOUNCE_DURATION);
		spectator.tick();

		expect(testApi.getOptions).toHaveBeenCalledTimes(1);
		expect(testApi.getOptions).toHaveBeenCalledWith({ clue: 'test' }, 0);

		spectator.tick(); // Avoid "1 periodic timer(s) still in the queue." because of the debounceTime(0) in the ALuCoreSelectApiDirective
	}));

	it('should debounce clue options', fakeAsync(() => {
		spectator.tick(); // Component initialization uses a setTimeout :see_no_evil:

		select.clueChanged('h');
		spectator.tick(MAGIC_DEBOUNCE_DURATION - 1);
		select.clueChanged('he');
		spectator.tick(MAGIC_DEBOUNCE_DURATION - 1);
		select.clueChanged('hey');
		spectator.tick(MAGIC_DEBOUNCE_DURATION);
		spectator.tick();

		expect(testApi.getOptions).toHaveBeenCalledTimes(1);
		expect(testApi.getOptions).toHaveBeenCalledWith({ clue: 'hey' }, 0);

		spectator.tick(); // Avoid "1 periodic timer(s) still in the queue." because of the debounceTime(0) in the ALuCoreSelectApiDirective
	}));
});
