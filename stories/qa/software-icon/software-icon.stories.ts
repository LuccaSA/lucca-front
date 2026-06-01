import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { SOFTWARE_ICON, SoftwareIconComponent } from '@lucca-front/ng/software-icon';
import { SoftwareIconWrapperItemDirective } from '@lucca-front/ng/software-icon-wrapper';
import { SoftwareIconWrapperComponent } from '@lucca-front/ng/software-icon-wrapper/software-icon-wrapper.component';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'software-icon-stories',
	templateUrl: './software-icon.stories.html',
	imports: [SoftwareIconComponent, LuSafeExternalSvgPipe, SoftwareIconWrapperComponent, SoftwareIconWrapperItemDirective, PopoverDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SoftwareIconStory {
	softwareIconList = SOFTWARE_ICON;
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
