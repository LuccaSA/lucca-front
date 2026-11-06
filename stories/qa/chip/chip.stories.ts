import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ChipComponent } from '@lucca-front/ng/chip';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'chip-stories',
	templateUrl: './chip.stories.html',
	imports: [ChipComponent, IconComponent, LuTooltipTriggerDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ChipStory {}

export default {
	title: 'QA/Chip',
	component: ChipStory,
	decorators: [
		applicationConfig({
			providers: [provideAnimations()],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<ChipStory> = {
	args: {},
	render: template,
};
