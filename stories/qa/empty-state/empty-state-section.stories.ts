import { Component, OnInit } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'empty-state-section-stories',
	templateUrl: './empty-state-section.stories.html',
})
class EmptyStateSectionStory implements OnInit {
	ngOnInit(): void {
		fetch('https://assets.codepen.io/158224/icon.svg')
			.then((res) => res.text())
			.then((svgText) => {
				let svgContainer = Object.assign(document.createElement('div'), {
					innerHTML: svgText,
				});
				Object.assign(svgContainer, { hidden: 'hidden' });
				document.body.append(svgContainer);
			});
	}
}

export default {
	title: 'QA/Empty State/Section',
	component: EmptyStateSectionStory,
} as Meta;

const template: StoryFn<EmptyStateSectionStory> = () => ({});

export const basic = template.bind({});
