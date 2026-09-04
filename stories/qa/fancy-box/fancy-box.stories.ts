import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'fancy-box-stories',
	templateUrl: './fancy-box.stories.html',
	imports: [FancyBoxComponent, LuSafeExternalSvgPipe, HttpClientModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		`
			td:first-child:not(:empty) ~ td {
				padding-block: var(--pr-t-spacings-400);
			}
		`,
	],
})
class FancyBoxStory {}

export default {
	title: 'QA/FancyBox',
	component: FancyBoxStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<FancyBoxStory> = {
	args: {},
	render: template,
};
