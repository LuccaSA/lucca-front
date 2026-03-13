import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface DialogFancyStory {
	size: string;
	illustration: string;
}

function getTemplate(args: DialogFancyStory): string {
	return `
<div class="dialog_backdrop"></div>
<div
	role="dialog"
	aria-modal="true"
	aria-labelledby="dialogInsideHeaderTitle1"
	class="dialog mod-fancy ${args.size}"
>
	<div class="dialog-inside" [attr.style]="'--components-dialog-inside-backgroundImage: url(https://cdn.lucca.fr/transverse/prisme/visuals/fancy-dialog/foreground-${args.illustration}.svg)'">
		<div class="dialog-inside-fancyIllustrations" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-dialog/background-bubbles.svg' | luSafeExternalSvg"></div>
		<form class="dialog-inside-formOptional">
			<header class="dialog-inside-header">
				<button type="button" class="dialog-inside-header-button button">
					<span class="lucca-icon icon-signClose" aria-hidden="true"></span>
					<span class="pr-u-mask">Fermer</span>
				</button>
				<div class="dialog-inside-header-container">
					<h1 class="dialog-inside-header-container-title" id="dialogInsideHeaderTitle1">Title</h1>
				</div>
			</header>
			<div class="dialog-inside-content">dialog dialog dialog dialog dialog dialog dialog dialog dialog dialog dialog dialog dialog dialog dialog</div>
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

const Template = (args: DialogFancyStory) => ({
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

class DialogFancyStory {}

export default {
	title: 'Documentation/Overlays/Dialog/Fancy',
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
	component: DialogFancyStory,
	argTypes: {
		size: {
			options: ['mod-fitContent', 'mod-XS', 'mod-S', '', 'mod-L', 'mod-XL', 'mod-XXL', 'mod-maxContent', 'mod-fullScreen'],
			control: {
				type: 'select',
			},
		},
		illustration: {
			options: ['approval', 'checklist', 'email', 'install', 'mapping', 'save', 'users', 'welcome'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Basic: StoryObj<DialogFancyStory> = {
	args: { size: '', illustration: 'welcome' },
	render: Template,
};
