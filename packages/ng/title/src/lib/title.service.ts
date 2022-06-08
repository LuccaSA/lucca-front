import { Inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { ILuTitleTranslateService, LU_TITLE_TRANSLATE_SERVICE } from './title-translate.service';

export type PageTitle = { title: string; params: { [param: string]: string } };
export const TitleSeparator = ' – ';

@Injectable()
export class LuTitleService {
	private titlesSubject = new BehaviorSubject<string[]>(['Lucca']);
	titles$ = this.titlesSubject.asObservable();
	title$ = this.titles$.pipe(map((titles: Array<string>) => titles.join(TitleSeparator)));

	constructor(private router: Router, private title: Title, @Inject(LU_TITLE_TRANSLATE_SERVICE) private translateService: ILuTitleTranslateService) {}

	init(applicationNameTranslationKey: string) {
		this.router.events
			.pipe(
				filter((event) => {
					return event instanceof ActivationEnd && event.snapshot.children.length === 0;
				}),
				map((event: ActivationEnd) => getPageTitleParts(event.snapshot)),
				map((titleParts) => uniqTitle(titleParts)),
				map((titleParts) => titleParts.filter(({ title }) => title !== '').map(({ title, params }) => this.translateService.translate(title, params))),
				map((titles: Array<string>) => [...titles, this.translateService.translate(applicationNameTranslationKey, {}), 'Lucca'].filter((x) => !!x)),
				distinctUntilChanged(),
				tap((titles) => this.titlesSubject.next(titles)),
			)
			.subscribe();

		this.title$.pipe(tap((title) => this.title.setTitle(title))).subscribe();
	}

	prependTitle(title: string, replaceFirstPrefix = false) {
		const titles = this.titlesSubject.value.slice(replaceFirstPrefix ? 1 : 0);
		this.titlesSubject.next([title, ...titles]);
	}
}

function getPageTitleParts(snapshot: ActivatedRouteSnapshot): Array<PageTitle> {
	const pageTitle: PageTitle = {
		title: (snapshot.data?.['title'] || '') as string,
		params: snapshot.params,
	};
	return snapshot.parent ? [pageTitle, ...getPageTitleParts(snapshot.parent)] : [pageTitle];
}

function uniqTitle(titleParts: Array<PageTitle>): Array<PageTitle> {
	return titleParts.filter(({ title }, index) => titleParts.findIndex((pageTitle) => pageTitle.title === title) === index);
}
