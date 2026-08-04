import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	HIGHLIGHT_SECTION_BUBBLE,
	HIGHLIGHT_SECTION_BUBBLE_POSITION,
	HIGHLIGHT_SECTION_ILLUSTRATION,
	HIGHLIGHT_SECTION_PALETTE,
	HIGHLIGHT_SECTION_THEME,
	HighlightSectionComponent,
} from '@lucca-front/ng/highlight-section';
import { LinkComponent } from '@lucca-front/ng/link';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/Structure/Highlight section/Angular/Basic',
	component: HighlightSectionComponent,

	decorators: [
		moduleMetadata({
			imports: [ButtonComponent, LinkComponent],
		}),
		applicationConfig({
			providers: [provideRouter([])],
		}),
	],
	render: (args: HighlightSectionComponent & { action: string }, context) => {
		const { action, ...inputs } = args;

		let actionContent = '';
		if (action === 'button') {
			actionContent = '<button luButton="outlined" type="button">Choisir un profil par défaut</button>';
		} else if (action === 'link') {
			actionContent = '<a luLink>Consulter le détail</a>';
		}

		return {
			template: `<lu-highlight-section ${generateInputs(inputs, context.argTypes)}>
	<div style="align-items: center; display: flex; gap: var(--pr-t-spacings-150); justify-content: space-between">
		<div>
			<p class="pr-u-fontWeightSemiBold">23 collaborateurs n’ont pas de profil spécifique.</p>
			<p class="pr-u-bodyS">En attendant de les associer, vous pouvez choisir un profil existant par défaut.</p>
		</div>
		${actionContent}
	</div>
</lu-highlight-section>`,
		};
	},
} as Meta;

export const Template: StoryObj<HighlightSectionComponent & { action: string }> = {
	argTypes: {
		theme: {
			options: setStoryOptions(HIGHLIGHT_SECTION_THEME),
			control: {
				type: 'select',
			},
		},
		palette: {
			options: setStoryOptions(HIGHLIGHT_SECTION_PALETTE),
			control: {
				type: 'select',
			},
			description: 'La palette influence également la couleur du SVG des bulles et donc l’URL associée, il est nécessaire de renseigner la gamme.',
		},
		bubble: {
			options: setStoryOptions(HIGHLIGHT_SECTION_BUBBLE),
			control: {
				type: 'select',
			},
			description: 'Sans valeur, aucun ornement n’est affiché.',
		},
		bubblePosition: {
			options: setStoryOptions(HIGHLIGHT_SECTION_BUBBLE_POSITION),
			control: {
				type: 'select',
			},
		},
		illustration: {
			options: setStoryOptions(HIGHLIGHT_SECTION_ILLUSTRATION),
			control: {
				type: 'select',
			},
			description: 'Il est également possible de renseigner une URL.',
		},
		action: {
			options: ['', 'button', 'link'],
			control: {
				type: 'select',
			},
		},
	},

	args: {
		theme: 'light',
		bubble: 1,
		bubblePosition: 'both',
		action: 'button',
	},
};
