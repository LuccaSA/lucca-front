import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'skeleton-stories',
	templateUrl: './skeleton.stories.html',
	styles: ['.example-box { background-color: white; padding: 1.5rem }']
}) class SkeletonStory {
	@Input() inverted: string = '';
	@Input() undetermined: string = '';
	@Input() mod: string = '';
}

export default {
	title: 'SCSS/Skeleton/Basic',
	component: SkeletonStory,
	argTypes: {
		inverted: {
			control: {
				type: 'radio',
				options: ['', 'mod-inverted'],
			}
		},
		undetermined: {
			control: {
				type: 'radio',
				options: ['', 'mod-undetermined'],
			}
		},
		mod: {
			control: {
				type: 'radio',
				options: ['', 'mod-circle', 'mod-pill', 'mod-rounded', 'mod-rounded-big'],
			}
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [SkeletonStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<SkeletonStory> = (args: SkeletonStory) => ({
	props: args,
});

export const def = template.bind({});
def.args = { inverted: '', undetermined: '', mod: '' };
