import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { createRoutingFactory, mockProvider, SpectatorRouting } from '@ngneat/spectator/jest';
import { skip } from 'rxjs/operators';
import { ILuTitleTranslateService, LU_TITLE_TRANSLATE_SERVICE } from './title-translate.service';
import { TitleSeparator, TitleService } from './title.service';

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
		<a class="link-4" [routerLink]="['/first/1/last']">Stub</a> `,
})
export class AppComponent {
	constructor(private titleService: TitleService) {
		this.titleService.init('BU');
	}
}

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
	constructor(private titleService: TitleService) {}
	ngOnInit() {
		this.titleService.prependTitle('Overridden title');
	}
}

describe('TitleService', () => {
	let spectator: SpectatorRouting<AppComponent>;

	const createComponent = createRoutingFactory({
		component: AppComponent,
		providers: [
			TitleService,
			mockProvider(Title),
			{
				provide: LU_TITLE_TRANSLATE_SERVICE,
				useClass: TranslateService,
			},
		],
		declarations: [StubComponent, OverrideTitleComponent],
		stubsEnabled: false,
		routes: [
			{
				path: '',
				data: { title: 'Stub' },
				component: StubComponent,
				children: [
					{
						path: 'first',
						data: { title: `` },
						component: StubComponent,
						children: [
							{
								path: ':id',
								data: { title: `Stubs' child {{id}}` },
								component: StubComponent,
								children: [
									{
										path: 'last',
										data: { title: `` },
										component: OverrideTitleComponent,
									},
								],
							},
						],
					},
				],
			},
		],
	});

	beforeEach(() => (spectator = createComponent()));

	it('should set title', async () => {
		let resultTitle = '';
		spectator.inject(TitleService).title$.subscribe((title) => (resultTitle = title));

		// wait for promises to resolve...
		await spectator.fixture.whenStable();
		expect(spectator.inject(Location).path()).toBe('/');

		spectator.click('.link-2');
		await spectator.fixture.whenStable();
		expect(resultTitle).toEqual(`Stub${TitleSeparator}BU${TitleSeparator}Lucca`);

		spectator.click('.link-3');
		await spectator.fixture.whenStable();
		expect(resultTitle).toEqual(`Stubs' child 1${TitleSeparator}Stub${TitleSeparator}BU${TitleSeparator}Lucca`);
	});

	it('prepend', async () => {
		let resultTitle = '';
		spectator
			.inject(TitleService)
			// We need to skip first value because the title is overridden by the component's ngOnInit
			.title$.pipe(skip(1))
			.subscribe((title) => (resultTitle = title));

		spectator.click('.link-4');
		await spectator.fixture.whenStable();
		expect(resultTitle).toEqual(`Overridden title${TitleSeparator}Stubs' child 1${TitleSeparator}Stub${TitleSeparator}BU${TitleSeparator}Lucca`);
	});
});
