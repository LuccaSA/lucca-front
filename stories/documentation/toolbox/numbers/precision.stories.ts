import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LuNumberPipe } from '@lucca-front/ng/number';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'precision-stories',
	imports: [LuNumberPipe],
	template: `<code [innerHTML]="value() | luNumber: precision()"></code>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PrecisionStory {
	value = input<number>();
	precision = input<number>();
}

export default {
	title: 'Documentation/Toolbox/Numbers/Precision',
	component: PrecisionStory,
	argTypes: {
		value: { control: { type: 'number' } },
		precision: { control: { type: 'range', min: 1, max: 15, step: 1 } },
	},
} as Meta;

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
	value = input<number>();
	precision = input<number>();
}
`;
export const Precision: StoryObj<PrecisionStory> = {
	args: {
		value: Math.PI,
		precision: 2,
	},
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
