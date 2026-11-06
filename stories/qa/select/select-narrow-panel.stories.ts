import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { ListboxComponent, OptionComponent } from '@lucca-front/ng/listbox';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'select-narrow-panel-story',
	templateUrl: './select-narrow-panel.stories.html',
	imports: [ListboxComponent, OptionComponent, IconComponent, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		`
			@layer components {
				.dialog,
				.dialog_backdrop {
					position: absolute !important;
				}
			}
		`,
	],
})
class SelectNarrowPanelStoryComponent {}

export default {
	title: 'QA/Select/Narrow/Panel',
	component: SelectNarrowPanelStoryComponent,
} as Meta;

export const Basic: StoryObj<SelectNarrowPanelStoryComponent> = {
	args: {},
	render: () => ({ template: '<select-narrow-panel-story />' }),
};
