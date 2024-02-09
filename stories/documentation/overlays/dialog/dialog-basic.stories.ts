import { Meta, StoryFn } from '@storybook/angular';

interface DialogBasicStory {
	size: string;
}

function getTemplate(args: DialogBasicStory): string {
	return `
<div class="dialog_backdrop"></div>
<div role="dialog" aria-modal="true" aria-labelledby="dialogInsideHeaderTitle1" class="dialog ${args.size}">
	<form class="dialog-inside">
		<header class="dialog-inside-header">
			<button type="button" class="dialog-inside-header-button button">
				<span class="lucca-icon icon-signClose" aria-hidden="true"></span>
				<span class="u-mask">Fermer</span>
			</button>
			<button type="button" class="dialog-inside-header-link link">Fermer</button>
			<h1 class="dialog-inside-header-title" id="dialogInsideHeaderTitle1">Title</h1>
		</header>
		<div class="dialog-inside-content">dialog</div>
		<footer class="dialog-inside-footer footer">
			<div class="footer-actions">
				<button type="submit" class="button">Action</button>
				<button type="button" class="button mod-text">Action</button>
			</div>
		</footer>
	</form>
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
			options: ['mod-fitContent', 'mod-XS', 'mod-S', '', 'mod-L', 'mod-XL', 'mod-maxContent', 'mod-fullScreen'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Basic = Template.bind({});
Basic.args = { size: '' };
