import { Component, Input } from '@angular/core';
import { LuNumberPipe } from '@lucca-front/ng/number';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'precision-stories',
	template: `<code [innerHTML]="value | luNumber: precision"></code>`,
})
class PrecisionStory {
	@Input() value: number;
	@Input() precision: number;
}

export default {
	title: 'Documentation/Toolbox/Numbers/Precision',
	component: PrecisionStory,
	argTypes: {
		value: { control: { type: 'number' } },
		precision: { control: { type: 'range', min: 1, max: 15, step: 1 } },
	},
	decorators: [
		moduleMetadata({
			imports: [LuNumberPipe],
			declarations: [PrecisionStory],
		}),
	],
} as Meta;

const template: Story<PrecisionStory> = (args: PrecisionStory) => ({
	props: args,
});

const code = `
/* 1. Importer LuNumberPipe */
import { LuNumberPipe } from '@lucca-front/ng/number';

@NgModule({
	imports: [LuNumberPipe]
})
class StoriesModule {}

/* 2. Utiliser le pipe luNumber */
@Component({
	selector: 'precision-stories',
	template: \`<code [innerHTML]="value | luNumber: precision"></code>\`,
})
class PrecisionStory {
	@Input() value: number;
	@Input() precision: number;
}
`;
export const Precision = template.bind({});
Precision.args = {
	value: Math.PI,
	precision: 2,
};

Precision.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	//controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
