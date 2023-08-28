import { Meta, StoryObj } from '@storybook/angular';
import { FooterComponent } from '../../../../packages/ng/footer/footer.component';
import { default as BasicStory } from './footer-basic.stories';

export default {
	...BasicStory,
	title: 'Documentation/Structure/Footer/NgTemplate Content',
	component: FooterComponent,
} as Meta;

export const Template: StoryObj<FooterComponent> = {
	args: {
		sticky: false,
	},
	render: (args) => {
		return {
			template: `<lu-footer ${args.sticky ? 'sticky' : ''} [content]="contentTpl">
	<ng-template #contentTpl>Hello, I am ng-template content, <b>I can use HTML</b></ng-template>
			<button type="button" class="button">Button</button>
			<button type="button" class="button mod-outlined">Button</button>
			<button type="button" class="button mod-text">Button</button>
</lu-footer>`,
		};
	},
};
