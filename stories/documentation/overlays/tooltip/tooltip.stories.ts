import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuPopoverPosition } from '@lucca-front/ng/popover';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { componentWrapperDecorator, Meta, moduleMetadata, StoryFn } from '@storybook/angular';

@Component({
	selector: 'tooltip-stories',
	standalone: true,
	imports: [LuTooltipModule],
	template: `<button
		type="button"
		class="button u-marginL"
		luTooltip="so you can see me"
		[luTooltipEnterDelay]="luTooltipEnterDelay"
		[luTooltipLeaveDelay]="luTooltipLeaveDelay"
		[luTooltipPosition]="luTooltipPosition"
		[luTooltipDisabled]="luTooltipDisabled"
		[luTooltipWhenEllipsis]="luTooltipWhenEllipsis"
		[class.u-ellipsis]="luTooltipWhenEllipsis"
		[tabindex]="tabindex"
		[attr.data-tooltip]="getDataTooltip()"
	>
		Come over here
	</button>`,
	styles: [
		`
			button.u-ellipsis {
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
	decorators: [
		componentWrapperDecorator(TooltipStory, (props: TooltipStory) => ({
			luTooltipEnterDelay: props.luTooltipEnterDelay,
			luTooltipLeaveDelay: props.luTooltipLeaveDelay,
			luTooltipDisabled: props.luTooltipDisabled,
			luTooltipPosition: props.luTooltipPosition,
			luTooltipWhenEllipsis: props.luTooltipWhenEllipsis,
			tabindex: props.tabindex,
		})),
		moduleMetadata({
			imports: [BrowserAnimationsModule],
		}),
	],
} as Meta;

const template: StoryFn<TooltipStory> = (args: TooltipStory) => ({
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
/* 1. Importer LuTooltipModule */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuTooltipModule } from '@lucca-front/ng/user';

@NgModule({
	imports: [LuUserPictureModule, BrowserAnimationsModule]
})
class StoriesModule {}

/* 2. Utiliser luTooltip */
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
