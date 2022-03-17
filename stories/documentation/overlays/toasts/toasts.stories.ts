import { Component } from '@angular/core';
import { LuToastsModule, LuToastsService, LuToastType } from '@lucca-front/ng/toast';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'toasts-stories',
	templateUrl: './toasts.stories.html',
}) class ToastsStory {

	constructor(private toastsService: LuToastsService) {}

	public toast(type: LuToastType, duration?: number | null): void {
		const toastsValues = [
			'Oh yeah! Something good happened :)',
			'Oops, something looks wrong :(',
			'Marked as done',
			'Please check <a href="#">this thing</a>',
			'Here <ins>is</ins> <em>some</em> <strong>HTML</strong>'
		];

		const random = Math.floor(Math.random() * toastsValues.length);

		this.toastsService.addToast({
			type,
			message: toastsValues[random],
			duration,
		});
	}
}

export default {
	title: 'Documentation/Overlays/Toasts',
	component: ToastsStory,
	decorators: [
		moduleMetadata({
			imports: [LuToastsModule],
			declarations: [ToastsStory]
		})
	]
} as Meta;

const template: Story<ToastsStory> = () => ({});

export const basic = template.bind({});
