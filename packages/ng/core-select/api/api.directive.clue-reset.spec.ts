import { ChangeDetectionStrategy, Component, Directive, computed } from '@angular/core';
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

const ALL: TestEntity[] = [
	{ id: 1, name: 'Carotte' },
	{ id: 2, name: 'Navet' },
	{ id: 3, name: 'Poireau' },
];

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-simple-select[testApi]',
})
class TestDirective extends ALuCoreSelectApiDirective<TestEntity> {
	public override totalCount$ = NEVER;

	// mirror the real establishment/apiV4 directives exactly: clue goes signal -> computed,
	// exposed synchronously via `paramsSignal` (and reactively via `params$`).
	protected readonly clue = toSignal(this.clue$);
	protected override readonly paramsSignal = computed<Record<string, string | number | boolean>>(() => {
		const clue = this.clue();
		return { ...(clue ? { clue } : {}) };
	});
	protected override readonly params$: Observable<Record<string, string | number | boolean>> = toObservable(this.paramsSignal);

	protected override optionKey = (option: TestEntity) => option.id;

	// establishment-style: server filters by the clue param
	public override getOptions(params: Record<string, string | number | boolean>): Observable<TestEntity[]> {
		const clue = (params['clue'] as string) ?? '';
		return of(clue ? ALL.filter((o) => o.name.toLowerCase().includes(clue.toLowerCase())) : ALL);
	}
}

@Component({
	template: ` <lu-simple-select testApi />`,
	imports: [TestDirective, LuSimpleSelectInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe('ALuCoreSelectApiDirective: clearing the clue resets dataSourceOptions', () => {
	let fixture: ComponentFixture<HostComponent>;
	let select: LuSimpleSelectInputComponent<TestEntity>;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HostComponent] });
		fixture = TestBed.createComponent(HostComponent);
		const de = fixture.debugElement.query(By.directive(LuSimpleSelectInputComponent));
		select = de.componentInstance as LuSimpleSelectInputComponent<TestEntity>;
	});

	it('resets to the full list after a search is cleared', fakeAsync(() => {
		tick();
		select.openPanel();
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);
		expect(select.dataSourceOptions().map((o) => o.name)).toEqual(['Carotte', 'Navet', 'Poireau']);

		// search
		select.clueChanged('car');
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);
		expect(select.dataSourceOptions().map((o) => o.name)).toEqual(['Carotte']);

		// clear
		select.clueChanged('');
		fixture.detectChanges();
		tick(MAGIC_DEBOUNCE_DURATION);
		expect(select.dataSourceOptions().map((o) => o.name)).toEqual(['Carotte', 'Navet', 'Poireau']);

		tick();
	}));
});
