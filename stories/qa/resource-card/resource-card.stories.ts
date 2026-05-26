import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
import { IconComponent } from '@lucca-front/ng/icon';
import { ResourceCardButtonComponent, ResourceCardComponent, ResourceCardLinkComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'resource-card-stories',
	templateUrl: './resource-card.stories.html',
	imports: [ResourceCardComponent, ResourceCardButtonComponent, ResourceCardLinkComponent, ResourceCardWrapperComponent, BubbleIconComponent, IconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ResourceCardStory {}

export default {
	title: 'QA/ResourceCard',
	component: ResourceCardStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<ResourceCardStory> = {
	args: {},
	render: template,
};
