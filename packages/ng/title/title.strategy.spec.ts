import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, Router, RouterLink, RouterOutlet, Routes, TitleStrategy, provideRouter } from '@angular/router';
import { of, timer } from 'rxjs';
import { map, skip } from 'rxjs/operators';
import { ILuTitleTranslateService } from './title-translate.service';
import { TitleSeparator } from './title.model';
import { LuTitleStrategy, provideLuTitleStrategy } from './title.strategy';

class TranslateService implements ILuTitleTranslateService {
	translate(key: string, args: Record<string, unknown> = null): string {
		if (args !== null) {
			Object.entries(args).forEach(([argKey, value]) => {
				key = key.replace(`{{${argKey}}}`, value as string);
			});
		}
		return key;
	}
}

@Component({
	selector: 'lu-app',
	imports: [RouterOutlet, RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<router-outlet />
		<a class="link-2" [routerLink]="['/first']">Stub</a>
		<a class="link-3" [routerLink]="['/first/1']">Stub</a>
		<a class="link-4" [routerLink]="['/first/1/last']">Stub</a>
		<a class="link-5" [routerLink]="['/first/1/end']">Stub</a>
		<a class="link-6" [routerLink]="['/first/1/delayed']">Stub</a>
		<a class="link-7" [routerLink]="['/second/1']">Stub</a> `,
})
export class AppComponent {}

@Component({
	selector: 'lu-stub',
	imports: [RouterOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<router-outlet />`,
})
export class StubComponent {}

@Component({
	selector: 'lu-override-title',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<div></div>`,
})
export class OverrideTitleComponent implements OnInit {
	constructor(@Inject(TitleStrategy) private titleService: LuTitleStrategy) {}
	ngOnInit() {
		this.titleService.prependTitle('Overridden title');
	}
}

@Component({
	selector: 'lu-delayed-override-title',
	imports: [RouterOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<router-outlet />`,
})
export class DelayedOverrideTitleComponent implements OnInit {
	constructor(@Inject(TitleStrategy) private titleService: LuTitleStrategy) {}
	ngOnInit() {
		this.titleService.prependTitle(timer(100).pipe(map(() => 'Delayed part')));
	}
}

@Component({
	selector: 'lu-override-title-part',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<div></div>`,
})
export class OverrideTitlePartComponent implements OnInit {
	constructor(@Inject(TitleStrategy) private titleService: LuTitleStrategy) {}
	ngOnInit() {
		this.titleService.overrideFirstTitlePart('New title part');
	}
}

describe('TitleStrategy', () => {
	let fixture: ComponentFixture<AppComponent>;
	let pageTitleService: LuTitleStrategy;

	const routes: Routes = [
		{
			path: '',
			title: 'Stub',
			component: StubComponent,
			children: [
				{
					path: 'first',
					component: StubComponent,
					children: [
						{
							path: ':id',
							title: `Stubs' child {{id}}`,
							component: StubComponent,
							children: [
								{
									path: 'last',
									title: ``,
									component: OverrideTitleComponent,
								},
								{
									path: 'end',
									title: `Old title part`,
									component: OverrideTitlePartComponent,
								},
								{
									path: 'delayed',
									title: ``,
									component: DelayedOverrideTitleComponent,
									children: [
										{
											path: '',
											component: OverrideTitleComponent,
										},
									],
								},
							],
						},
					],
				},
				{
					path: 'second',
					component: StubComponent,
					children: [
						{
							path: ':id',
							title: `Stubs' child {{name}}`,
							resolve: { name: (route: ActivatedRouteSnapshot) => of(`Name ${route.paramMap.get('id')}`) },
							component: StubComponent,
						},
					],
				},
			],
		},
	];

	async function clickLink(selector: string): Promise<void> {
		(fixture.nativeElement as HTMLElement).querySelector<HTMLAnchorElement>(selector)!.click();
		fixture.detectChanges();
		await fixture.whenStable();
	}

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [
				provideRouter(routes),
				{ provide: Title, useValue: { setTitle: jest.fn(), getTitle: jest.fn().mockReturnValue('') } },
				provideLuTitleStrategy({
					appTitle: () => 'BU',
					translateService: () => new TranslateService(),
				}),
			],
		});

		fixture = TestBed.createComponent(AppComponent);
		pageTitleService = TestBed.inject(TitleStrategy) as unknown as LuTitleStrategy;
		fixture.detectChanges();
		await TestBed.inject(Router).navigateByUrl('/');
		fixture.detectChanges();
	});

	it('should set title', async () => {
		let resultTitle = '';
		pageTitleService.title$.subscribe((title) => (resultTitle = title));

		await fixture.whenStable();
		expect(TestBed.inject(Router).url).toBe('/');
		expect(resultTitle).toEqual(`Stub${TitleSeparator}Lucca BU`);
	});

	it('should ignore empty or absent titles', async () => {
		let resultTitle = '';
		pageTitleService.title$.subscribe((title) => (resultTitle = title));

		await clickLink('.link-2');
		expect(resultTitle).toEqual(`Stub${TitleSeparator}Lucca BU`);
	});

	it('should include named params in title', async () => {
		let resultTitle = '';
		pageTitleService.title$.subscribe((title) => (resultTitle = title));

		await clickLink('.link-3');
		expect(resultTitle).toEqual(`Stubs' child 1${TitleSeparator}Stub${TitleSeparator}Lucca BU`);
	});

	it('should prepend title when a component forces its own title', async () => {
		let resultTitle = '';

		// We need to skip first value because the title is overridden by the component's ngOnInit
		pageTitleService.title$.pipe(skip(1)).subscribe((title) => (resultTitle = title));

		await clickLink('.link-4');
		expect(resultTitle).toEqual(`Overridden title${TitleSeparator}Stubs' child 1${TitleSeparator}Stub${TitleSeparator}Lucca BU`);
	});

	it('should override title part when a component forces its own title part', async () => {
		let resultTitle = '';
		// We need to skip first value because the title is overridden by the component's ngOnInit
		pageTitleService.title$.pipe(skip(1)).subscribe((title) => (resultTitle = title));

		await clickLink('.link-5');
		expect(resultTitle).toEqual(`New title part${TitleSeparator}Stubs' child 1${TitleSeparator}Stub${TitleSeparator}Lucca BU`);
	});

	it('should handle observable inputs', async () => {
		let resultTitle = '';
		// We need to skip first value because the title is overridden by the component's ngOnInit
		pageTitleService.title$.pipe(skip(1)).subscribe((title) => (resultTitle = title));

		await clickLink('.link-6');
		expect(resultTitle).toEqual(`Overridden title${TitleSeparator}Delayed part${TitleSeparator}Stubs' child 1${TitleSeparator}Stub${TitleSeparator}Lucca BU`);
	});

	it('should include named params in title', async () => {
		let resultTitle = '';
		pageTitleService.title$.subscribe((title) => (resultTitle = title));

		await clickLink('.link-7');
		expect(resultTitle).toEqual(`Stubs' child Name 1${TitleSeparator}Stub${TitleSeparator}Lucca BU`);
	});
});
