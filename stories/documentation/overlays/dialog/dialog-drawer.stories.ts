import { Meta, StoryFn } from '@storybook/angular';

interface DialogDrawerStory {
	size: string;
}

function getTemplate(args: DialogDrawerStory): string {
	return `
<div class="dialog_backdrop"></div>
<div role="dialog" aria-modal="true" aria-labelledby="dialogInsideHeaderTitle1" class="dialog mod-drawer ${args.size}">
	<div class="dialog-inside">
		<form class="dialog-inside-formOptional">
			<header class="dialog-inside-header">
				<button type="button" class="dialog-inside-header-button button">
					<span class="lucca-icon icon-signClose" aria-hidden="true"></span>
					<span class="u-mask">Fermer</span>
				</button>
				<div class="dialog-inside-header-container">
					<h1 class="dialog-inside-header-container-title" id="dialogInsideHeaderTitle1">Title</h1>
				</div>
			</header>
			<div class="dialog-inside-content">dialog</div>
			<footer class="dialog-inside-footer footer">
				<div class="footer-actions">
					<button type="submit" class="button">Action</button>
					<button type="button" class="button mod-ghost">Action</button>
				</div>
			</footer>
		</form>
	</div>
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
				block-size: 30rem;
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
			options: ['mod-fitContent', 'mod-XS', 'mod-S', '', 'mod-L', 'mod-XL', 'mod-maxContent', 'mod-fullScreen'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Drawer = Template.bind({});
Drawer.args = { size: '' };
