import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, StoryFn, applicationConfig } from '@storybook/angular';

@Component({
	selector: 'disabled-stories',
	standalone: true,
	imports: [LuTooltipModule],
	template: `<button type="button" class="button" disabled="disabled">Bouton désactivé</button>
		<button type="button" class="button" aria-disabled="true" (click)="$event.preventDefault()" [luTooltip]="'On explique pourquoi le bouton est désactivé'">
			Bouton désactivé avec une infobulle
		</button>`,
	styles: [
		`
			:host {
				display: flex;
				gap: var(--spacings-S);
				flex-direction: column;
				align-items: flex-start;
			}
		`,
	],
})
class DisabledStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Disabled',
	component: DisabledStory,
	argTypes: {},
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const template: StoryFn<DisabledStory> = (args) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {};

const code = `<button type="button" class="button" disabled="disabled">Bouton désactivé</button>

<button type="button" class="button" aria-disabled="true" (click)="$event.preventDefault()" [luTooltip]="'On explique pourquoi le bouton est désactivé'">
	Bouton désactivé avec une infobulle
</button>`;

Basic.parameters = {
	docs: {
		source: {
			language: 'html',
			type: 'code',
			code,
		},
	},
};
