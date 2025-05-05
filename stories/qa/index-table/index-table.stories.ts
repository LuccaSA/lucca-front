import { Component } from '@angular/core';
import { ButtonComponent } from "@lucca-front/ng/button";
import { IconComponent } from '@lucca-front/ng/icon';
import { StatusBadgeComponent } from '@lucca-front/ng/statusBadge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'index-table-stories',
	templateUrl: './index-table.stories.html',
	imports: [StatusBadgeComponent, TagComponent, LuUserPictureComponent, ButtonComponent, IconComponent],
})
class IndexTableStory {}

export default {
	title: 'QA/IndexTable',
	component: IndexTableStory,
} as Meta;

const template: StoryFn<IndexTableStory> = () => ({});

export const basic = template.bind({});
