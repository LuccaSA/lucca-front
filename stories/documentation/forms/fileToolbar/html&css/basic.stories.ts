import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from 'dist/ng/button';

export default {
	title: 'Documentation/File/FileToolbar/HTML&CSS/Basic',
	decorators: [
		moduleMetadata({
			imports: [ButtonComponent, IconComponent, LuTooltipModule],
		}),
	],
	argTypes: {
		size: {
			options: ['S', null],
			control: {
				type: 'radio',
			},
		},
	},

	render: (args) => {
		const { size, disablePositioning, downloadAction, deleteAction, ..._inputArgs } = args;
		const sizeClass = size === 'S' ? `mod-S` : ``;
		const disablePositioningClass = disablePositioning ? `mod-disablePositioning` : ``;
		const down = downloadAction
			? `<li class="fileToolbar-list-item">
			<button
				class="fileToolbar-list-item-button"
				type="button"
				luButton
				luTooltip="Télécharger"
				luTooltipOnlyForDisplay
				(click)="abort(inputRef)"
			>
				<lu-icon class="fileToolbar-list-item-button-icon" icon="arrowDownload" alt="Télécharger le fichier « Lorem »" />
			</button>
		</li>`
			: ``;
		const del = deleteAction
			? `<li class="fileToolbar-list-item">
			<button
				class="fileToolbar-list-item-button"
				type="button"
				luButton
				luTooltip="Supprimer"
				luTooltipOnlyForDisplay
				(click)="abort(inputRef)"
			>
				<lu-icon class="fileToolbar-list-item-button-icon" icon="trashDelete" alt="Supprimer le fichier « Lorem »" />
			</button>
		</li>`
			: ``;
		if (downloadAction || deleteAction) {
			return {
				styles: [
					`:host {
						height: 5rem;
						position: relative;
					}`,
				],
				template: `
<div class="fileToolbar ${sizeClass} ${disablePositioningClass}">
	<ul class="fileToolbar-list">
		${down}
		${del}
	</ul>
</div>
`,
			};
		} else {
			return {
				template: ` `,
			};
		}
	},
} as Meta;

export const Basic = {
	args: {
		size: null,
		disablePositioning: false,
		downloadAction: false,
		deleteAction: true,
	},
};
