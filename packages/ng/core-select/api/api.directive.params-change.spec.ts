import { ChangeDetectionStrategy, Component, Directive, computed, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { NEVER, Observable, of } from 'rxjs';
import { ALuCoreSelectApiDirective, MAGIC_DEBOUNCE_DURATION } from './api.directive';

interface TestEntity {
	id: number;
	name: string;
}

const ACTIVE: TestEntity[] = [{ id: 1, name: 'Carotte' }];
const WITH_FORMER: TestEntity[] = [
	{ id: 1, name: 'Carotte' },
	{ id: 2, name: 'Navet (parti)' },
];

/**
 * Mirrors the users directive: a panel header toggle drives a signal that feeds the params, next to
 * the clue.
 */
@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[testApi]',
})
class TestDirective extends ALuCoreSelectApiDirective<TestEntity> {
	public override totalCount$ = NEVER;

	public readonly includeFormer = signal(false);

	protected readonly clue = toSignal(this.clue$);
	protected override readonly paramsSignal = computed<Record<string, string | number | boolean>>(() => {
		const clue = this.clue();
		return {
			...(clue ? { clue } : {}),
			...(this.includeFormer() ? { former: true } : {}),
		};
	});
	protected override readonly params$: Observable<Record<string, string | number | boolean>> = toObservable(this.paramsSignal);

	protected override optionKey = (option: TestEntity) => option.id;

	public override getOptions(params: Record<string, string | number | boolean>): Observable<TestEntity[]> {
		const all = params['former'] ? WITH_FORMER : ACTIVE;
		const clue = (params['clue'] as string) ?? '';
		return of(clue ? all.filter((o) => o.name.toLowerCase().includes(clue.toLowerCase())) : all);
	}
}

@Component({
	template: ` <lu-simple-select testApi />`,
	imports: [TestDirective, LuSimpleSelectInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe('ALuCoreSelectApiDirective: a params change reloads the options', () => {
	let fixture: ComponentFixture<HostComponent>;
	let select: LuSimpleSelectInputComponent<TestEntity>;
	let testApi: TestDirective;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HostComponent] });
		fixture = TestBed.createComponent(HostComponent);
		select = fixture.debugElement.query(By.directive(LuSimpleSelectInputComponent)).componentInstance as LuSimpleSelectInputComponent<TestEntity>;
		testApi = fixture.debugElement.query(By.directive(TestDirective)).injector.get(TestDirective);
	});

	it('refetches when a param changes while the panel is open', fakeAsync(() => {
		tick();
		select.openPanel();
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);
		expect(select.dataSourceOptions().map((o) => o.name)).toEqual(['Carotte']);

		testApi.includeFormer.set(true);
		fixture.detectChanges();
		tick();

		expect(select.dataSourceOptions().map((o) => o.name)).toEqual(['Carotte', 'Navet (parti)']);
	}));

	it('keeps the current clue when reloading', fakeAsync(() => {
		tick();
		select.openPanel();
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);

		select.clueChanged('navet');
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);
		expect(select.dataSourceOptions()).toEqual([]);

		testApi.includeFormer.set(true);
		fixture.detectChanges();
		tick();

		expect(select.dataSourceOptions().map((o) => o.name)).toEqual(['Navet (parti)']);
	}));

	it('does not fire a second request when only the clue changes', fakeAsync(() => {
		const getOptions = vi.spyOn(testApi, 'getOptions');
		tick();
		select.openPanel();
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);
		getOptions.mockClear();

		select.clueChanged('carotte');
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);
		tick();

		// The clue already has its own path through the select, debounce included: the params emission
		// it causes must not load the same page again
		expect(getOptions).toHaveBeenCalledTimes(1);
	}));

	it('does not refetch while the panel is closed', fakeAsync(() => {
		const getOptions = vi.spyOn(testApi, 'getOptions');
		tick();

		testApi.includeFormer.set(true);
		fixture.detectChanges();
		tick();

		expect(getOptions).not.toHaveBeenCalled();
	}));
});
