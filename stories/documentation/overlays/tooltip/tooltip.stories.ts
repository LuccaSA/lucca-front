import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuPopoverPosition } from '@lucca-front/ng/popover';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'tooltip-stories',
	template: `<button
		type="button"
		class="button u-marginBig"
		luTooltip="so you can see me"
		[luTooltipEnterDelay]="luTooltipEnterDelay"
		[luTooltipLeaveDelay]="luTooltipLeaveDelay"
		[luTooltipPosition]="luTooltipPosition"
		[luTooltipDisabled]="luTooltipDisabled"
		[luTooltipWhenEllipsis]="luTooltipWhenEllipsis"
		[class.u-ellipsis]="luTooltipWhenEllipsis"
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
	},
	decorators: [
		componentWrapperDecorator(TooltipStory, (props: TooltipStory) => ({
			luTooltipEnterDelay: props.luTooltipEnterDelay,
			luTooltipLeaveDelay: props.luTooltipLeaveDelay,
			luTooltipDisabled: props.luTooltipDisabled,
			luTooltipPosition: props.luTooltipPosition,
			luTooltipWhenEllipsis: props.luTooltipWhenEllipsis,
		})),
		moduleMetadata({
			imports: [LuTooltipModule, BrowserAnimationsModule],
			declarations: [TooltipStory],
		}),
	],
} as Meta;

const template: Story<TooltipStory> = (args: TooltipStory) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {
	luTooltipEnterDelay: 50,
	luTooltipLeaveDelay: 50,
	luTooltipDisabled: false,
	luTooltipPosition: 'below',
	luTooltipWhenEllipsis: false,
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
	controls: { include: ['luTooltipEnterDelay', 'luTooltipLeaveDelay', 'luTooltipDisabled', 'luTooltipPosition', 'luTooltipWhenEllipsis'] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
