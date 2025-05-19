import { inject, Injectable, InjectionToken, Provider } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { BehaviorSubject, combineLatest, isObservable, Observable, ObservableInput, of } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ILuTitleTranslateService, LU_TITLE_TRANSLATE_SERVICE } from './title-translate.service';
import { PageTitle, TitleSeparator } from './title.model';

export const ɵAPP_TITLE = new InjectionToken<string | Observable<string>>('APP_TITLE');
export type LuTitleNamingStrategy = 'product' | 'other';
export const ɵNAMING_STRATEGY = new InjectionToken<LuTitleNamingStrategy>('NAMING_STRATEGY');

/**
 * @deprecated Use `provideLuTitleStrategy` instead.
 */
export const APP_TITLE = ɵAPP_TITLE;

const Lucca = 'Lucca';

@Injectable({ providedIn: 'root' })
export class LuTitleStrategy extends TitleStrategy {
	private title = inject(Title);
	private translateService = inject<ILuTitleTranslateService>(LU_TITLE_TRANSLATE_SERVICE, { optional: true });
	private appTitle = inject(ɵAPP_TITLE);
	private namingStrategy = inject(ɵNAMING_STRATEGY);

	private luccaTitle$ = isObservable(this.appTitle) ? this.appTitle.pipe(map((title) => this.#luccaTitle(title))) : of(this.#luccaTitle(this.appTitle));

	private titlePartsSubject = new BehaviorSubject<Array<string | ObservableInput<string>>>([Lucca]);
	titleParts$ = this.titlePartsSubject.asObservable();
	title$ = this.titleParts$.pipe(
		switchMap((titleParts) => combineLatest(titleParts.map((part) => (typeof part === 'string' ? of(part) : part)))),
		map((parts) => parts.join(TitleSeparator)),
		distinctUntilChanged(),
	);
	constructor() {
		super();
		this.title$.pipe(tap((title) => this.title.setTitle(title))).subscribe();
	}

	override updateTitle(routerState: RouterStateSnapshot) {
		// Title page is display from child to root
		const pageTitles = this.#getPageTitleParts(routerState.root).reverse();
		const translatedPageTitles = uniqTitle(pageTitles)
			.filter(({ title }) => title !== '')
			.map(({ title, params }) => (this.translateService ? this.translateService.translate(title, params) : title));
		// Add the name app
		const titleParts = [...translatedPageTitles, this.luccaTitle$].filter((x) => !!x);
		this.titlePartsSubject.next(titleParts);
	}

	prependTitle(title: string | ObservableInput<string>) {
		this.titlePartsSubject.next([title, ...this.titlePartsSubject.value]);
	}

	overrideFirstTitlePart(title: string | ObservableInput<string>) {
		this.titlePartsSubject.next([title, ...this.titlePartsSubject.value.slice(1)]);
	}

	#getPageTitleParts(snapshot: ActivatedRouteSnapshot): Array<PageTitle> {
		const pageTitle: PageTitle = {
			title: this.getResolvedTitleForRoute(snapshot) as string,
			params: { ...snapshot.params, ...snapshot.data },
		};
		return snapshot.firstChild ? [pageTitle, ...this.#getPageTitleParts(snapshot.firstChild)] : [pageTitle];
	}

	#luccaTitle(appTitle: string) {
		if (this.namingStrategy === 'product') {
			return appTitle.includes(Lucca) ? appTitle : `${Lucca} ${appTitle}`;
		}
		return `${appTitle}${TitleSeparator}${Lucca}`;
	}
}

function uniqTitle(titleParts: Array<PageTitle>): Array<PageTitle> {
	return titleParts.filter(({ title }, index) => titleParts.findIndex((pageTitle) => pageTitle.title === title) === index);
}

export interface LuTitleStrategyOptions {
	appTitle?: () => string | Observable<string>;
	translateService?: () => ILuTitleTranslateService;
	namingStrategy?: LuTitleNamingStrategy;
}

export function provideLuTitleStrategy(options: LuTitleStrategyOptions): Provider[] {
	const providers: Provider[] = [{ provide: TitleStrategy, useClass: LuTitleStrategy }];

	if (options.appTitle) {
		providers.push({ provide: ɵAPP_TITLE, useFactory: options.appTitle });
	}
	if (options.translateService) {
		providers.push({ provide: LU_TITLE_TRANSLATE_SERVICE, useFactory: options.translateService });
	}

	const namingStrategy = options.namingStrategy ?? 'product';
	providers.push({ provide: ɵNAMING_STRATEGY, useValue: namingStrategy });

	return providers;
}
