import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'toasts-stories',
	templateUrl: './toasts.stories.html',
}) class ToastsStory {
	toast() {
		var toastsBox = document.getElementById("toastsBox");
		var toast = document.createElement("div");
		var toastsValues = [
			'Oh yeah! Something good happened :)',
			'Oops, something looks wrong :(',
			'Marked as done',
			'Please check <a href="#">this thing</a>',
			'Here <ins>is</ins> <em>some</em> <strong>HTML</strong>'
		];
		var r = Math.floor(Math.random() * Math.floor(toastsValues.length));
		toast.className = "toasts-item";
		toast.innerHTML = toastsValues[r];
		var close = document.createElement('button');
		close.className = "toasts-item-kill";
		close.addEventListener('click', this.toastKill, false);
		toast.appendChild(close);
		toastsBox.appendChild(toast);
	}
	toastKill() {
		this.parentElement.remove();
	}
}

export default {
  title: 'SCSS/Toasts',
  component: ToastsStory,
	decorators: [
		moduleMetadata({
			entryComponents: [ToastsStory]
		})
	]
} as Meta;

const template: Story<ToastsStory> = () => ({});

export const basic = template.bind({});
