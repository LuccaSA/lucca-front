import { Component, Input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuPopoverPosition } from '@lucca-front/ng/popover';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, StoryFn, applicationConfig } from '@storybook/angular';

@Component({
	selector: 'tooltip-stories',
	standalone: true,
	imports: [LuTooltipModule],
	template: `
		<button
			type="button"
			class="button pr-u-marginBlock400"
			style="margin-inline: 100px"
			luTooltip="so you can see me"
			[luTooltipEnterDelay]="luTooltipEnterDelay"
			[luTooltipLeaveDelay]="luTooltipLeaveDelay"
			[luTooltipPosition]="luTooltipPosition"
			[luTooltipDisabled]="luTooltipDisabled"
			[luTooltipWhenEllipsis]="luTooltipWhenEllipsis"
			[tabindex]="tabindex"
			[attr.data-tooltip]="getDataTooltip()"
		>
			Come over here
		</button>
		<br />
		<b>Ellipsis enabled:</b>
		<div
			class="ellipsis-example u-ellipsis"
			luTooltip="In the Game Boy Pokémon games, Pokémon Red, Green, Blue, and Yellow, players were able to access a set of 105 glitch Pokémon."
			[luTooltipEnterDelay]="luTooltipEnterDelay"
			[luTooltipLeaveDelay]="luTooltipLeaveDelay"
			[luTooltipPosition]="luTooltipPosition"
			[luTooltipDisabled]="luTooltipDisabled"
			luTooltipWhenEllipsis
		>
			In the Game Boy Pokémon games, Pokémon Red, Green, Blue, and Yellow, players were able to access a set of 105 glitch Pokémon.
		</div>
		<br />
		<b>Ellipsis from padding:</b>
		<div style="width: 228px">
			<div
				class="ellipsis-padding u-ellipsis"
				luTooltip="In the Game Boy Pokémon games."
				[luTooltipEnterDelay]="luTooltipEnterDelay"
				[luTooltipLeaveDelay]="luTooltipLeaveDelay"
				[luTooltipPosition]="luTooltipPosition"
				[luTooltipDisabled]="luTooltipDisabled"
				luTooltipWhenEllipsis
			>
				In the Game Boy Pokémon games.
			</div>
		</div>
		<br />
		<b>Same code but text is not ellipsed:</b>
		<div
			luTooltip="In the Game Boy Pokémon games, Pokémon Red, Green, Blue, and Yellow, players were able to access a set of 105 glitch Pokémon."
			[luTooltipEnterDelay]="luTooltipEnterDelay"
			[luTooltipLeaveDelay]="luTooltipLeaveDelay"
			[luTooltipPosition]="luTooltipPosition"
			[luTooltipDisabled]="luTooltipDisabled"
			luTooltipWhenEllipsis
		>
			In the Game Boy Pokémon games, Pokémon Red, Green, Blue, and Yellow, players were able to access a set of 105 glitch Pokémon.
		</div>
	`,
	styles: [
		`
			.ellipsis-padding {
				width: 228px;
				padding-inline: 14px;
			}

			.ellipsis-example {
				width: 100px;
			}
		`,
	],
})
class TooltipStory {
	@Input() luTooltipEnterDelay: number;
	@Input() luTooltipLeaveDelay: number;
	@Input() luTooltipDisabled: boolean;
	@Input() luTooltipPosition: LuPopoverPosition;
	@Input() luTooltipWhenEllipsis: boolean;
	@Input() tabindex: number | null;

	getDataTooltip() {
		if (this.luTooltipDisabled && this.tabindex !== null) {
			return 'hardcoded-disabled';
		}
		if (this.luTooltipDisabled) {
			return 'disabled';
		}
		if (this.tabindex !== null) {
			return 'hardcoded';
		}
		return 'basic';
	}
}

export default {
	title: 'Documentation/Overlays/Tooltip/Basic',
	component: TooltipStory,
	argTypes: {
		luTooltipEnterDelay: {
			control: { type: 'number' },
		},
		luTooltipLeaveDelay: {
			control: { type: 'number' },
		},
		luTooltipDisabled: {
			control: { type: 'boolean' },
		},
		luTooltipPosition: {
			control: 'inline-radio',
			options: ['above', 'below', 'before', 'after'],
		},
		luTooltipWhenEllipsis: {
			control: { type: 'boolean' },
		},
		tabindex: {
			control: { type: 'number' },
		},
	},
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const template: StoryFn<TooltipStory> = (args) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {
	luTooltipEnterDelay: 50,
	luTooltipLeaveDelay: 50,
	luTooltipDisabled: false,
	luTooltipPosition: 'below',
	luTooltipWhenEllipsis: false,
	tabindex: null,
};

const code = `
/* 1. Appeler provideAnimations */
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
	providers: [provideAnimations()]
})
class AppModule {}

/* 2. Importer LuTooltipModule */
import { LuTooltipModule } from '@lucca-front/ng/user';

@NgModule({
	imports: [LuUserPictureModule]
})
class StoriesModule {}

/* 3. Utiliser luTooltip */
@Component({
	selector: "luTooltip-stories",
	template:
	\`<button luTooltip="so you can see me"
	[luTooltipEnterDelay]="luTooltipEnterDelay"
	[luTooltipLeaveDelay]="luTooltipLeaveDelay"
	[luTooltipPosition]="luTooltipPosition"
	[luTooltipDisabled]="luTooltipDisabled"
	[luTooltipWhenEllipsis]="luTooltipWhenEllipsis"
	[class.u-ellipsis]="luTooltipWhenEllipsis">
		Come over here
	</button>\`,
})
class TooltipStory {
  @Input() luTooltipEnterDelay: number;
  @Input() luTooltipLeaveDelay: number;
  @Input() luTooltipDisabled: boolean;
  @Input() luTooltipPosition: LuPopoverPosition;
}`;

Basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: ['luTooltipEnterDelay', 'luTooltipLeaveDelay', 'luTooltipDisabled', 'luTooltipPosition', 'luTooltipWhenEllipsis', 'tabindex'] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
