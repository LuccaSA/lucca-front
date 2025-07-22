import { Meta, StoryFn } from '@storybook/angular';

interface DialogBasicStory {
	size: string;
	neutralBackground: boolean;
}

function getTemplate(args: DialogBasicStory): string {
	const neutralBackground = args.neutralBackground ? ' mod-neutralBackground' : '';
	return `
<div class="dialog_backdrop"></div>
<div role="dialog" aria-modal="true" aria-labelledby="dialogInsideHeaderTitle1" class="dialog${neutralBackground} ${args.size}">
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

const Template: StoryFn<DialogBasicStory> = (args: DialogBasicStory) => ({
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
		neutralBackground: {
			control: {
				type: 'boolean',
			},
			description: '[v18.3]',
		},
	},
} as Meta;

export const Basic = Template.bind({});
Basic.args = { size: '', neutralBackground: false };
