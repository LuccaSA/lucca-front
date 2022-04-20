import { Component, OnDestroy, OnInit } from '@angular/core';
import { defaultToastDuration, LuToastInput, LuToastsModule, LuToastsService, LuToastType } from '@lucca-front/ng/toast';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
import { Observable, ReplaySubject, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { LuToastsComponent } from '../../../../packages/ng/toast/src/toasts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'toasts-stories',
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
		this.toastError$ = this.error$
			.pipe(map((message, index) => ({ type: 'Error', message })));
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public createToast(type: LuToastType, duration?: number | null): void {
		const message = this.getRandomMessage();
		this.toastsService.addToast({type, message, duration});
	}

	public notifyError(): void {
		this.error$.next(this.getRandomMessage());
	}

	private getRandomMessage(): string {
		const toastsValues = [
			'Oh yeah! Something good happened :)',
			'Oops, something looks wrong :(',
			'Marked as done',
			'Please check <a href="#">this thing</a>',
			'Here <ins>is</ins> <em>some</em> <strong>HTML</strong>'
		];

		const random = Math.floor(Math.random() * toastsValues.length);
		return toastsValues[random];
	}
}

export default {
	title: 'Documentation/Overlays/Toasts',
	component: LuToastsComponent,
	decorators: [
		componentWrapperDecorator(ToastsStory),
		moduleMetadata({
			imports: [LuToastsModule, FormsModule, BrowserAnimationsModule],
			declarations: [ToastsStory]
		})
	]
} as Meta;

const template: Story<ToastsStory> = (args: ToastsStory) => ({
	props: args,
});

const code = () => `
/* Ajouter l'encre <lu-toasts></lu-toasts> dans le app.component.html */
<lu-toasts [bottom]="true" [sources]="[]"></lu-toasts>

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
    	message,
    	duration /* Pour activer la suppression manuel du toast, il faut setter la durée à null (et pas undefined) */
    });
  }
}

`

export const basic = template.bind({});
basic.args = {}
basic.parameters = {
	docs: {
		source: {
			language: 'ts',
			code: code(),
		}
	},
	controls: { include: [] },
};
