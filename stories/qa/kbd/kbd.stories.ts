import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent } from '@lucca-front/ng/dropdown';
import { KbdComponent } from '@lucca-front/ng/kbd';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'kbd-stories',
	templateUrl: './kbd.stories.html',
	imports: [KbdComponent, DropdownMenuComponent, DropdownItemComponent, DropdownActionComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	styles: `
		.demo-kbdPressed .kbd,
		.demo-kbdPressed.mod-last .kbd:last-of-type {
			animation-name: kbdTap;
			animation-play-state: paused;
			animation-delay: calc(var(--components-kbd-animationDuration) * -0.2);
		}

		.demo-kbdPressed.mod-last .kbd:not(:last-of-type) {
			animation-name: none;
		}

		.demo-kbdPopover {
			inline-size: fit-content;
		}
	`,
})
class KbdStory {
	readonly pill = input(false, { transform: booleanAttribute });
	readonly skeuo = input(false, { transform: booleanAttribute });
}

interface KbdArgs {
	pill: boolean;
	skeuo: boolean;
}

export default {
	title: 'QA/Kbd',
	component: KbdStory,
	argTypes: {
		pill: { table: { disable: true } },
		skeuo: { table: { disable: true } },
	},
	render: (args: KbdArgs) => ({
		props: { ...args },
		template: '<kbd-stories [pill]="pill" [skeuo]="skeuo" />',
	}),
} as Meta<KbdArgs>;

export const Basic: StoryObj<KbdArgs> = { args: { pill: false, skeuo: false } };
export const Pill: StoryObj<KbdArgs> = { args: { pill: true, skeuo: false } };
export const Skeuo: StoryObj<KbdArgs> = { args: { pill: false, skeuo: true } };
export const PillSkeuo: StoryObj<KbdArgs> = { args: { pill: true, skeuo: true } };
