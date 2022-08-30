import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	LuPopoverAlignment,
	LuPopoverModule,
	LuPopoverPosition,
	LuPopoverTriggerDirective,
	LuPopoverTriggerEvent
} from '@lucca-front/ng/popover';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'popover-mock-directive-story',
	template: `
`,
}) class PopoverMockDirectiveStory extends LuPopoverTriggerDirective {
}


@Component({
	selector: 'popover-story',
	template: `
		<button type="button"
			class="button"
			[luPopover]="popover"
			[luPopoverPosition]="position"
			[luPopoverAlignment]="alignment"
			[luPopoverTrigger]="trigger"
			>{{trigger}} me</button>
		<lu-popover #popover>{{popoverContent}}</lu-popover>
`,
}) class PopoverStory {
	@Input() popoverContent: string = '🎉 popover content 🏖️';
	@Input() position: LuPopoverPosition = 'above';
	@Input() alignment: LuPopoverAlignment = 'top';
	@Input() trigger: LuPopoverTriggerEvent = 'click';
}

export default {
  title: 'Documentation/Overlays/Popover',
  component: PopoverMockDirectiveStory,
	decorators: [
		componentWrapperDecorator(PopoverStory),
		moduleMetadata({
			declarations: [PopoverStory, PopoverMockDirectiveStory],
			imports: [
				LuPopoverModule,
				BrowserAnimationsModule,
			]
		})
	]
} as Meta;

const template: Story<PopoverStory> = (args: PopoverStory) => ({
  props: args,
});

const code = `
/* 1. Importer LuPopoverModule */
import { LuPopoverModule } from '@lucca-front/ng/popover';

@NgModule({
	imports: [LuPopoverModule]
})
class PopoverStoriesModule {}

/* 2. Utiliser lu-popover */
@Component({
	selector: 'popover-story',
	template: \`
		<button type="button" class="button" [luPopover]="popover">Click me</button>
		<lu-popover #popover>🎉 popover content 🏖️</lu-popover>
	\`
})
class PopoverStory { }`

export const basic = template.bind({});
basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		}
	}
}
