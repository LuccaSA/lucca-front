import { EventEmitter, QueryList } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ɵLuOptionComponent } from '../option';
import { CoreSelectKeyManager } from './key-manager';

describe('CoreSelectKeyManager', () => {
	let queryList: QueryList<ɵLuOptionComponent<string>>;
	let options$: BehaviorSubject<string[]>;
	let keyManager: CoreSelectKeyManager<string>;

	const clueChange$ = new EventEmitter<string>();
	const activeOptionIdChanged$ = new EventEmitter<string>();

	beforeEach(fakeAsync(() => {
		TestBed.configureTestingModule({
			providers: [CoreSelectKeyManager],
		});

		queryList = new QueryList<ɵLuOptionComponent<string>>();
		options$ = new BehaviorSubject<string[]>([]);
		keyManager = TestBed.inject(CoreSelectKeyManager);

		keyManager.init({
			queryList,
			options$,
			optionComparer: (a, b) => a === b,
			activeOptionIdChanged$,
			clueChange$,
		});
		tick();
	}));

	it('should select first option on clue change', fakeAsync(() => {
		// Arrange
		options$.next(['lol 1', 'lol 2', 'lol 3']);
		queryList.reset(createComponents(options$.value));
		keyManager.setActiveItem(2);
		tick();

		// Act
		clueChange$.emit('test');
		options$.next(['test 1', 'test 2', 'test 3']);
		queryList.reset(createComponents(options$.value));
		tick();

		// Assert
		expect(keyManager.activeItemIndex).toBe(0);
	}));

	it('should select first option is list goes empty then filled again', fakeAsync(() => {
		// Arrange
		options$.next(['lol 1', 'lol 2', 'lol 3']);
		queryList.reset(createComponents(options$.value));
		keyManager.setActiveItem(2);
		tick();

		// Act
		options$.next([]);
		queryList.reset([]);
		tick();

		expect(keyManager.activeItemIndex).toBe(-1);

		options$.next(['test 1', 'test 2', 'test 3']);
		queryList.reset(createComponents(options$.value));
		tick();

		// Assert
		expect(keyManager.activeItemIndex).toBe(0);
	}));

	it('should keep selected index while options are loading after clue change', fakeAsync(() => {
		// Arrange
		options$.next(['lol 1', 'lol 2', 'lol 3', 'lol 4', 'lol 5']);
		const components = createComponents(options$.value);
		queryList.reset(components);
		keyManager.setActiveItem(2);
		tick();

		// Act
		clueChange$.emit('test');
		tick();

		// Assert
		expect(keyManager.activeItemIndex).toBe(2);
	}));

	describe('highlightOption', () => {
		it('should select option immediatly if already available', fakeAsync(() => {
			// Arrange
			options$.next(['lol 1', 'lol 2', 'lol 3']);
			queryList.reset(createComponents(options$.value));
			tick();

			// Act
			keyManager.highlightOption('lol 2');
			tick();

			// Assert
			expect(keyManager.activeItemIndex).toBe(1);
		}));

		it('should select option when available', fakeAsync(() => {
			// Act
			keyManager.highlightOption('lol 2');
			tick();

			expect(keyManager.activeItemIndex).toBe(-1);

			tick(1000); // Wait some time

			options$.next(['lol 1', 'lol 2', 'lol 3']);
			tick();

			// Assert
			expect(keyManager.activeItemIndex).toBe(1);
		}));
	});
});

let id = 0;

function createComponents(options: string[]): ɵLuOptionComponent<string>[] {
	return options.map(createComponent);
}

function createComponent(option: string): ɵLuOptionComponent<string> {
	const component = {} as ɵLuOptionComponent<string>;
	component.option = option;
	component.setActiveStyles = () => {};
	component.setInactiveStyles = () => {};
	(component as any).id = String(id++);
	return component;
}
