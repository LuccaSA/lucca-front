import { AfterContentInit, Component } from '@angular/core';

@Component({
	selector: 'lu-global-story-wrapper',
	standalone: true,
	template: '<ng-content></ng-content>',
})
export class GlobalStoryWrapperComponent implements AfterContentInit {
	public ngAfterContentInit() {
		// Hack while docs.source.state: 'open' works again
		setTimeout(() => {
			document.querySelectorAll('.docblock-code-toggle:not(.docblock-code-toggle--expanded)').forEach((el) => (el instanceof HTMLButtonElement ? el.click() : undefined));
		}, 0);
	}
}
