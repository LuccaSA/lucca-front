import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, TitleStrategy } from '@angular/router';
import { SpectatorRouting, createRoutingFactory, mockProvider } from '@ngneat/spectator/jest';
import { of, timer } from 'rxjs';
import { map, skip } from 'rxjs/operators';
import { ILuTitleTranslateService, LU_TITLE_TRANSLATE_SERVICE } from './title-translate.service';
import { TitleSeparator } from './title.model';
import { APP_TITLE, LuTitleStrategy } from './title.strategy';

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
	template: `<router-outlet></router-outlet>
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
	template: `<router-outlet></router-outlet>`,
})
export class StubComponent {}

@Component({
	selector: 'lu-override-title',
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
	template: `<router-outlet></router-outlet>`,
})
export class DelayedOverrideTitleComponent implements OnInit {
	constructor(@Inject(TitleStrategy) private titleService: LuTitleStrategy) {}
	ngOnInit() {
		this.titleService.prependTitle(timer(100).pipe(map(() => 'Delayed part')));
	}
}

@Component({
	selector: 'lu-override-title-part',
	template: `<div></div>`,
})
export class OverrideTitlePartComponent implements OnInit {
	constructor(@Inject(TitleStrategy) private titleService: LuTitleStrategy) {}
	ngOnInit() {
		this.titleService.overrideFirstTitlePart('New title part');
	}
}

describe('TitleService', () => {
	let spectator: SpectatorRouting<AppComponent>;
	let pageTitleService: LuTitleStrategy;

	const createComponent = createRoutingFactory({
		component: AppComponent,
		providers: [
			mockProvider(Title),
			{
				provide: LU_TITLE_TRANSLATE_SERVICE,
				useClass: TranslateService,
			},
			{
				provide: TitleStrategy,
				useClass: LuTitleStrategy,
			},
			{
				provide: APP_TITLE,
				useValue: 'BU',
			},
		],
		declarations: [StubComponent, OverrideTitleComponent, OverrideTitlePartComponent, DelayedOverrideTitleComponent],
		stubsEnabled: false,
		routes: [
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
		],
	});

	beforeEach(() => {
		spectator = createComponent();
		pageTitleService = spectator.inject(TitleStrategy) as unknown as LuTitleStrategy;
	});

	it('should set title', async () => {
		let resultTitle = '';
		pageTitleService.title$.subscribe((title) => (resultTitle = title));

		await spectator.fixture.whenStable();
		expect(spectator.inject(Location).path()).toBe('/');
		expect(resultTitle).toEqual(`Stub${TitleSeparator}BU${TitleSeparator}Lucca`);
	});

	it('should ignore empty or absent titles', async () => {
		let resultTitle = '';
		pageTitleService.title$.subscribe((title) => (resultTitle = title));

		spectator.click('.link-2');
		await spectator.fixture.whenStable();
		expect(resultTitle).toEqual(`Stub${TitleSeparator}BU${TitleSeparator}Lucca`);
	});

	it('should include named params in title', async () => {
		let resultTitle = '';
		pageTitleService.title$.subscribe((title) => (resultTitle = title));

		spectator.click('.link-3');
		await spectator.fixture.whenStable();
		expect(resultTitle).toEqual(`Stubs' child 1${TitleSeparator}Stub${TitleSeparator}BU${TitleSeparator}Lucca`);
	});

	it('should prepend title when a component forces its own title', async () => {
		let resultTitle = '';

		// We need to skip first value because the title is overridden by the component's ngOnInit
		pageTitleService.title$.pipe(skip(1)).subscribe((title) => (resultTitle = title));

		spectator.click('.link-4');
		await spectator.fixture.whenStable();
		expect(resultTitle).toEqual(`Overridden title${TitleSeparator}Stubs' child 1${TitleSeparator}Stub${TitleSeparator}BU${TitleSeparator}Lucca`);
	});

	it('should override title part when a component forces its own title part', async () => {
		let resultTitle = '';
		// We need to skip first value because the title is overridden by the component's ngOnInit
		pageTitleService.title$.pipe(skip(1)).subscribe((title) => (resultTitle = title));

		spectator.click('.link-5');
		await spectator.fixture.whenStable();
		expect(resultTitle).toEqual(`New title part${TitleSeparator}Stubs' child 1${TitleSeparator}Stub${TitleSeparator}BU${TitleSeparator}Lucca`);
	});

	it('should handle observable inputs', async () => {
		let resultTitle = '';
		// We need to skip first value because the title is overridden by the component's ngOnInit
		pageTitleService.title$.pipe(skip(1)).subscribe((title) => (resultTitle = title));

		spectator.click('.link-6');
		await spectator.fixture.whenStable();
		expect(resultTitle).toEqual(`Overridden title${TitleSeparator}Delayed part${TitleSeparator}Stubs' child 1${TitleSeparator}Stub${TitleSeparator}BU${TitleSeparator}Lucca`);
	});

	it('should include named params in title', async () => {
		let resultTitle = '';
		pageTitleService.title$.subscribe((title) => (resultTitle = title));

		spectator.click('.link-7');
		await spectator.fixture.whenStable();
		expect(resultTitle).toEqual(`Stubs' child Name 1${TitleSeparator}Stub${TitleSeparator}BU${TitleSeparator}Lucca`);
	});
});
