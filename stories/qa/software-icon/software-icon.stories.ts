import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { SoftwareIconComponent, SoftwareIconList } from '@lucca-front/ng/software-icon';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SoftwareIconWrapperComponent } from '@lucca-front/ng/software-icon-wrapper/software-icon-wrapper.component';

@Component({
	selector: 'software-icon-stories',
	templateUrl: './software-icon.stories.html',
	imports: [SoftwareIconComponent, LuSafeExternalSvgPipe, SoftwareIconWrapperComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SoftwareIconStory {
	softwareIconList = SoftwareIconList;
}

export default {
	title: 'QA/SoftwareIcon',
	component: SoftwareIconStory,
	decorators: [
		moduleMetadata({
			entryComponents: [SoftwareIconStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<SoftwareIconStory> = {
	args: {},
	render: template,
};
