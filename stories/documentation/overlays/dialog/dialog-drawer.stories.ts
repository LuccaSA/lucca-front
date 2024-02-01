import { Meta, StoryFn } from '@storybook/angular';

interface DialogDrawerStory {
	size: string;
	fromBottom: string;
}

function getTemplate(args: DialogDrawerStory): string {
	const fromBottom = args.fromBottom ? 'mod-fromBottom' : '';
	return `
<div class="backdrop-dialog"></div>
<div role="dialog" aria-modal="true" aria-labelledby="dialogHeaderTitle1" class="dialog mod-drawer ${args.size} ${fromBottom}">
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

const Template: StoryFn<DialogDrawerStory> = (args: DialogDrawerStory) => ({
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

class DialogDrawerStory {}

export default {
	title: 'Documentation/Overlays/Dialog/Drawer',
	component: DialogDrawerStory,
	argTypes: {
		size: {
			options: ['mod-fitContent', 'mod-XS', 'mod-S', '', 'mod-L', 'mod-XL', 'mod-fullScreen'],
			control: {
				type: 'select',
			},
		},
		fromBottom: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

export const Drawer = Template.bind({});
Drawer.args = { size: '', fromBottom: false };
