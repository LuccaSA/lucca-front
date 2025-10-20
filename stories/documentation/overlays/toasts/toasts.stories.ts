import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuToastInput, LuToastType, LuToastsComponent, LuToastsService, defaultToastDuration } from '@lucca-front/ng/toast';
import { Meta, StoryFn, applicationConfig } from '@storybook/angular';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'toasts-stories',
	imports: [FormsModule, LuToastsComponent],
	templateUrl: './toasts.stories.html',
})
class ToastsStory implements OnInit, OnDestroy {
	public isBottom = false;

	public defaultToastDuration = defaultToastDuration;
	public toastError$: Observable<LuToastInput>;
	private error$ = new ReplaySubject<string>(1);

	private destroy$ = new Subject<void>();

	constructor(private toastsService: LuToastsService) {}

	public ngOnInit(): void {
		this.toastError$ = this.error$.pipe(map((message, index) => ({ type: 'Error', message })));
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public createToast(type: LuToastType, duration?: number | null): void {
		const title = this.getRandomTitle();
		const message = this.getRandomMessage();
		this.toastsService.addToast({ type, title, message, duration });
	}

	public createToastWithTemplate(type: LuToastType, message: TemplateRef<unknown>): void {
		this.toastsService.addToast({ type, message });
	}

	public notifyError(): void {
		this.error$.next(this.getRandomMessage());
	}

	private getRandomMessage(): string {
		const toastsValues = [
			'Lorem ipsum',
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
			'Lorem <a href="#">ipsum</a> dolor',
			'<ins>Lorem</ins> <em>ipsum</em> <strong>dolor</strong>',
		];

		const random = Math.floor(Math.random() * toastsValues.length);
		return toastsValues[random];
	}

	private getRandomTitle(): string {
		const toastsValues = ['Titre du toast', 'Titre du toast long, très très très très très très long', undefined];

		const random = Math.floor(Math.random() * toastsValues.length);
		return toastsValues[random];
	}

	onClickButtonInsideToast() {
		this.createToast('Info');
	}
}

export default {
	title: 'Documentation/Overlays/Toasts',
	component: ToastsStory,
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const template: StoryFn<ToastsStory> = (args) => ({
	props: args,
});

const code = `
/* Ajouter l'encre <lu-toasts /> dans le app.component.html */
<lu-toasts [bottom]="true" [sources]="[]" />

/* Ajouter un toast avec la méthode addToast(..) du LuToastsService */
@Component({
  selector: 'toasts-stories',
  templateUrl: './toasts.stories.html',
})
class ToastsStory implements OnInit, OnDestroy {

  /* Par défaut la durée de vie d'un toast est de 5000ms */
  public defaultToastDuration = defaultToastDuration;

  constructor(private toastsService: LuToastsService) {}

  public createToast(type: LuToastType, duration?: number | null): void {
    const message = 'random-message';
    this.toastsService.addToast({
    	type, /* LuToastType peut être : 'Info' | 'Error' | 'Success' | 'Warning' */
    	title, /* Pour rajouter un titre au toast */
    	message,
    	duration /* Pour activer la suppression manuel du toast, il faut setter la durée à null (et pas undefined) */
    });
  }
}

`;

export const basic = template.bind({});
basic.args = {};
basic.parameters = {
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
	controls: { include: [] },
};
