import { Meta, StoryFn } from '@storybook/angular';

interface DialogBasicStory {
	size: string;
}

function getTemplate(args: DialogBasicStory): string {
	return `
<div class="backdrop-dialog"></div>
<div role="dialog" aria-modal="true" aria-labelledby="dialogHeaderTitle1" class="dialog ${args.size}">
	<header class="dialog-header">
		<button type="button" class="dialog-header-close button">
			<span class="lucca-icon icon-signClose" aria-hidden="true"></span>
			<span class="u-mask">Fermer</span>
		</button>
		<button type="button" class="dialog-header-close link">Fermer</button>
		<h1 class="dialog-header-title" id="dialogHeaderTitle1">Title</h1>
	</header>
	<div class="dialog-content">dialog</div>
	<footer class="dialog-footer footer">
		<div class="footer-actions">
			<button type="button" class="button">Action</button>
			<button type="button" class="button mod-text">Action</button>
		</div>
	</footer>
</div>
	`;
}

const Template: StoryFn<DialogBasicStory> = (args: DialogBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
			:host {
				display: block;
				height: 30rem;
			}
		`,
	],
});

class DialogBasicStory {}

export default {
	title: 'Documentation/Overlays/Dialog/Basic',
	component: DialogBasicStory,
	argTypes: {
		size: {
			options: ['mod-fitContent', 'mod-XS', 'mod-S', '', 'mod-L', 'mod-XL', 'mod-fullScreen'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Basic = Template.bind({});
Basic.args = { size: '' };
