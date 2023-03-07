import { AfterContentInit, Component, ElementRef, inject, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Subscription, take, timer } from 'rxjs';

@Component({
	selector: 'lu-global-story-wrapper',
	standalone: true,
	template: '<ng-content></ng-content>',
})
export class GlobalStoryWrapperComponent implements AfterContentInit, OnDestroy {
	private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
	private subscription?: Subscription;

	private isLoaded$ = timer(0, 200).pipe(
		map(() => this.elementRef.nativeElement.getBoundingClientRect().top + window.screenY),
		distinctUntilChanged(),
		debounceTime(500),
		take(1),
	);

	public ngAfterContentInit() {
		const allStories = Array.from(document.querySelectorAll('#storybook-docs .docs-story'));
		const lastStory = allStories[allStories.length - 1];
		const isLastStory = lastStory && lastStory.contains(this.elementRef.nativeElement);

		if (isLastStory) {
			setTimeout(() => {
				// Hack while docs.source.state: 'open' works again
				document.querySelectorAll('.docblock-code-toggle:not(.docblock-code-toggle--expanded)').forEach((el) => (el instanceof HTMLButtonElement ? el.click() : undefined));
			}, 0);

			this.subscription = this.isLoaded$.subscribe(() => {
				if (window.parent?.location?.hash) {
					location.hash = window.parent.location.hash;
				}
			});
		}
	}

	public ngOnDestroy() {
		this.subscription?.unsubscribe();
	}
}
