import { Meta, StoryFn } from '@storybook/angular';

interface DialogDrawerFromBottomStory {
	size: string;
	titleCentered: boolean;
}

function getTemplate(args: DialogDrawerFromBottomStory): string {
	const modCentered = args.titleCentered ? 'mod-titleCentered' : '';
	return `
<div class="dialog_backdrop"></div>
<div role="dialog" aria-modal="true" aria-labelledby="dialogInsideHeaderTitle1" class="dialog mod-drawer mod-fromBottom ${args.size} ${modCentered}">
	<form class="dialog-inside">
		<header class="dialog-inside-header">
			<button type="button" class="button">
				<span class="lucca-icon icon-signClose" aria-hidden="true"></span>
				<span class="u-mask">Fermer</span>
			</button>
			<button type="button" class="link">Fermer</button>
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

const Template: StoryFn<DialogDrawerFromBottomStory> = (args: DialogDrawerFromBottomStory) => ({
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

class DialogDrawerFromBottomStory {}

export default {
	title: 'Documentation/Overlays/Dialog/DrawerFromBottom',
	component: DialogDrawerFromBottomStory,
	argTypes: {
		size: {
			options: ['mod-fitContent', 'mod-maxContent', 'mod-fullScreen'],
			control: {
				type: 'select',
			},
		},
		titleCentered: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

export const DrawerFromBottom = Template.bind({});
DrawerFromBottom.args = { size: 'mod-fitContent', titleCentered: 'false' };
