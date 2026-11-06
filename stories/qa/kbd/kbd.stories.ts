import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent } from '@lucca-front/ng/dropdown';
import { KbdComponent } from '@lucca-front/ng/kbd';
import { Meta } from '@storybook/angular-vite';

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
class KbdStory {}

export default {
	title: 'QA/Kbd',
	component: KbdStory,
} as Meta;

export const Basic = {};
