import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component, Directive, forwardRef, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SelectDataSource } from '@lucca-front/ng/core-select';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuCoreSelectJobQualificationsDirective } from './job-qualifications.directive';
import { LuCoreSelectJobQualification } from './models';

const jobQualificationsUrl = '/organization/structure/api/job-qualifications';

const jobQualification = (id: number, jobId: number): LuCoreSelectJobQualification => ({
	id,
	name: `Qualification ${id}`,
	job: { id: jobId, name: `Job ${jobId}` },
	level: { id, name: `Level ${id}` },
});

@Directive({
	selector: '[luTestJobQualifications]',
	providers: [
		{
			provide: LuCoreSelectJobQualificationsDirective,
			useExisting: forwardRef(() => TestJobQualificationsDirective),
		},
	],
})
class TestJobQualificationsDirective extends LuCoreSelectJobQualificationsDirective {
	public setPageSize(size: number): void {
		this.pageSize = size;
	}
}

@Component({
	selector: 'lu-job-qualifications-directive-host',
	imports: [LuMultiSelectInputComponent, TestJobQualificationsDirective],
	template: `<lu-multi-select luTestJobQualifications [filters]="filters()" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LuJobQualificationsDirectiveHostComponent {
	readonly filters = signal<Record<string, string | number | boolean> | null>(null);
	readonly multiSelect = viewChild.required<LuMultiSelectInputComponent<LuCoreSelectJobQualification>>(LuMultiSelectInputComponent);
	readonly jobQualificationsDirective = viewChild.required<TestJobQualificationsDirective>(TestJobQualificationsDirective);
}

describe(LuCoreSelectJobQualificationsDirective.name, () => {
	let httpTestingController: HttpTestingController;
	let fixture: ComponentFixture<LuJobQualificationsDirectiveHostComponent>;
	let host: LuJobQualificationsDirectiveHostComponent;

	function getGroupOptions(jobId: number): LuCoreSelectJobQualification[] {
		const dataSource = host.multiSelect().dataSource() as SelectDataSource<LuCoreSelectJobQualification, unknown>;
		const options: LuCoreSelectJobQualification[] = [];
		dataSource.getGroupOptions!(jobId).subscribe((groupOptions) => options.push(...groupOptions));
		return options;
	}

	function expectGroupPage(jobId: number, page: number) {
		return httpTestingController.expectOne((req) => req.url === jobQualificationsUrl && req.params.get('job.id') === `${jobId}` && req.params.get('page') === `${page}`);
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [LuJobQualificationsDirectiveHostComponent],
			providers: [provideHttpClient(), provideHttpClientTesting()],
		});

		httpTestingController = TestBed.inject(HttpTestingController);
		fixture = TestBed.createComponent(LuJobQualificationsDirectiveHostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
		host.jobQualificationsDirective().setPageSize(2);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should expose getGroupOptions on its data source', () => {
		expect(host.multiSelect().dataSource().getGroupOptions).toBeDefined();
	});

	it('should load every page of the job, including the options not rendered yet', fakeAsync(() => {
		const options = getGroupOptions(1);

		expectGroupPage(1, 1).flush([jobQualification(1, 1), jobQualification(2, 1)]);
		tick();
		// The first page is full, so a second one is requested
		expectGroupPage(1, 2).flush([jobQualification(3, 1)]);
		tick();

		expect(options.map((option) => option.id)).toEqual([1, 2, 3]);
	}));

	it('should restrict the job call with the same filters as the list', fakeAsync(() => {
		host.filters.set({ isActive: true });
		fixture.detectChanges();

		getGroupOptions(7);

		const req = expectGroupPage(7, 1);
		expect(req.request.params.get('isActive')).toBe('true');
		expect(req.request.params.get('search')).toBeNull();
		req.flush([jobQualification(1, 7)]);
		tick();
	}));
});
