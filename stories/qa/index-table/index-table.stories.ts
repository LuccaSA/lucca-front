import { Component } from '@angular/core';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { Meta, StoryFn } from '@storybook/angular';
import { StatusBadgeComponent } from 'dist/ng/statusBadge';

@Component({
	standalone: true,
	selector: 'index-table-stories',
	templateUrl: './index-table.stories.html',
	imports: [StatusBadgeComponent, TagComponent, LuUserPictureComponent],
})
class IndexTableStory {}

export default {
	title: 'QA/IndexTable',
	component: IndexTableStory,
} as Meta;

const template: StoryFn<IndexTableStory> = () => ({});

export const basic = template.bind({});
