import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableOfContentComponent, TableOfContentLinkDirective } from '@lucca-front/ng/table-of-content';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'table-of-content-stories',
	templateUrl: './table-of-content.stories.html',
	imports: [TableOfContentComponent, TableOfContentLinkDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TableOfContentStory {}

export default {
	title: 'QA/TableOfContent',
	component: TableOfContentStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TableOfContentStory> = {
	args: {},
	render: template,
};
