import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuPopoverPosition } from '@lucca-front/ng/popover';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';


@Component({
	selector: 'tooltip-stories',
	template: `<button luTooltip='so you can see me'
	[luTooltipEnterDelay]='luTooltipEnterDelay'
	[luTooltipLeaveDelay]='luTooltipLeaveDelay'
	[luTooltipPosition]='luTooltipPosition'
	[luTooltipDisabled]='luTooltipDisabled'>
		Come over here
	</button>`,
}) class TooltipStory {
	@Input() luTooltipEnterDelay: number;
	@Input() luTooltipLeaveDelay: number;
	@Input() luTooltipDisabled: boolean;
	@Input() luTooltipPosition: LuPopoverPosition;
}

export default {
  title: 'Documentation/Overlays/Tooltip/Basic',
  component: TooltipStory,
	argTypes: {
		luTooltipEnterDelay: {
			control: {type: 'number'},
		},
		luTooltipLeaveDelay: {
			control: {type: 'number'},
		},
		luTooltipDisabled: {
			control: {type: 'boolean'},
		},
		luTooltipPosition: {
			control: 'inline-radio', options: ['above', 'below', 'before', 'after'],
		},
	},
	decorators: [
		componentWrapperDecorator(TooltipStory, (props: TooltipStory) =>
			({
				luTooltipEnterDelay: props.luTooltipEnterDelay,
				luTooltipLeaveDelay: props.luTooltipLeaveDelay,
				luTooltipDisabled: props.luTooltipDisabled,
				luTooltipPosition: props.luTooltipPosition
			})),
		moduleMetadata({
			imports: [
				LuTooltipModule,
				BrowserAnimationsModule,
			],
			declarations: [TooltipStory],
		})
	]
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
}

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
	selector: 'luTooltip-stories',
	template:
	\`<button luTooltip='so you can see me'
	[luTooltipEnterDelay]='luTooltipEnterDelay'
	[luTooltipLeaveDelay]='luTooltipLeaveDelay'
	[luTooltipPosition]='luTooltipPosition'
	[luTooltipDisabled]='luTooltipDisabled'>
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
	controls: { include: ['luTooltipEnterDelay', 'luTooltipLeaveDelay', 'luTooltipDisabled', 'luTooltipPosition'] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
