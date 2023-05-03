import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { BehaviorSubject, combineLatest, ObservableInput, of } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ILuTitleTranslateService, LU_TITLE_TRANSLATE_SERVICE } from './title-translate.service';
import { PageTitle, TitleSeparator } from './title.model';

export const APP_TITLE = new InjectionToken('APP_TITLE');

@Injectable({ providedIn: 'root' })
export class LuTitleStrategy extends TitleStrategy {
	private titlePartsSubject = new BehaviorSubject<Array<string | ObservableInput<string>>>(['Lucca']);
	titleParts$ = this.titlePartsSubject.asObservable();
	title$ = this.titleParts$.pipe(
		switchMap((titleParts) => combineLatest(titleParts.map((part) => (typeof part === 'string' ? of(part) : part)))),
		map((parts) => parts.join(TitleSeparator)),
		distinctUntilChanged(),
	);
	constructor(private title: Title, @Inject(LU_TITLE_TRANSLATE_SERVICE) private translateService: ILuTitleTranslateService, @Inject(APP_TITLE) private appTitle: string) {
		super();
		this.title$.pipe(tap((title) => this.title.setTitle(title))).subscribe();
	}

	override updateTitle(routerState: RouterStateSnapshot) {
		// Title page is display from child to root
		const pageTitles = this.#getPageTitleParts(routerState.root).reverse();
		const translatedPageTitles = uniqTitle(pageTitles)
			.filter(({ title }) => title !== '')
			.map(({ title, params }) => this.translateService.translate(title, params));
		// Add the name app and 'Lucca' at the end of the title
		const titleParts = [...translatedPageTitles, this.translateService.translate(this.appTitle), 'Lucca'].filter((x) => !!x);
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
}

function uniqTitle(titleParts: Array<PageTitle>): Array<PageTitle> {
	return titleParts.filter(({ title }, index) => titleParts.findIndex((pageTitle) => pageTitle.title === title) === index);
}
