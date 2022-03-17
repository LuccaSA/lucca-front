import { Component, OnDestroy, OnInit } from '@angular/core';
import { defaultToastDuration, LuToastInput, LuToastsModule, LuToastsService, LuToastType } from '@lucca-front/ng/toast';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { Observable, ReplaySubject, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { FormsModule } from "@angular/forms";

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
	component: ToastsStory,
	decorators: [
		moduleMetadata({
			imports: [LuToastsModule, FormsModule],
			declarations: [ToastsStory]
		})
	]
} as Meta;

const template: Story<ToastsStory> = () => ({});

export const basic = template.bind({});
