import { Component } from '@angular/core';
import { LuNumberModule, LuNumberPipe } from '@lucca-front/ng/number';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'numbers-stories',
	template: `
		<table class="table">
			<thead class="table-head">
				<tr class="table-head-row">
					<th class="table-head-row-cell">Number</th>
					<th class="table-head-row-cell u-textRight">Value</th>
					<th class="table-head-row-cell u-textRight">Value aligned</th>
				</tr>
			</thead>
			<tbody class="table-body">
				<tr class="table-body-row">
					<td class="table-body-row-cell">π</td>
					<td class="table-body-row-cell u-textRight">{{ pi }}</td>
					<td class="table-body-row-cell u-textRight">{{ pi | luNumber }}</td>
				</tr>
				<tr class="table-body-row">
					<td class="table-body-row-cell">ten</td>
					<td class="table-body-row-cell u-textRight">{{ ten }}</td>
					<td class="table-body-row-cell u-textRight">{{ ten | luNumber }}</td>
				</tr>
				<tr class="table-body-row">
					<td class="table-body-row-cell"><span>e</span></td>
					<td class="table-body-row-cell u-textRight">{{ e }}</td>
					<td class="table-body-row-cell u-textRight">{{ e | luNumber }}</td>
				</tr>
				<tr class="table-body-row">
						<td class="table-body-row-cell">milliers</td>
						<td class="table-body-row-cell u-textRight">{{ thousands }}</td>
						<td class="table-body-row-cell u-textRight">{{ thousands | luNumber }}</td>
					</tr>
			</tbody>
		</table>
	`,
})
class NumbersStory {

}

export default {
	title: 'Documentation/Users/Picture/Basic',
	component: LuNumberPipe,
	argTypes: {
	},
	decorators: [
		componentWrapperDecorator(NumbersStory, (props: NumbersStory) => ({  })),
		moduleMetadata({
			imports: [LuNumberModule],
			declarations: [NumbersStory],
		}),
	],
} as Meta;

const template: Story<NumbersStory> = (args: NumbersStory) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {
};

const code = `
/* 1. Importer LuNumberModule */
import { LuNumberModule } from '@lucca-front/ng/number';

@NgModule({
	imports: [LuNumberModule]
})
class StoriesModule {}

/* 2. Utiliser le pipe luNumber */
`;

Basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
