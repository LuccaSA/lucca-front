import { Component } from '@angular/core';
import { LuNumberPipe } from '@lucca-front/ng/number';
import { Meta, Story } from '@storybook/angular';

@Component({
	selector: 'numbers-stories',
	standalone: true,
	imports: [LuNumberPipe],
	templateUrl: './numbers.stories.html',
})
class NumbersStory {
	public pi = 3.141592;
	public ten = 10;
	public e = 2.71727;
	public thousands = 12345;
}

export default {
	title: 'Documentation/Toolbox/Numbers/Basic',
	component: NumbersStory,
} as Meta;

const template: Story<NumbersStory> = (args: NumbersStory) => ({
	props: args,
});

const code = `
/* 1. Importer LuNumberPipe */
import { LuNumberPipe } from '@lucca-front/ng/number';

@NgModule({
	imports: [LuNumberPipe]
})
class StoriesModule {}

/* 2. Template */
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
			<td class="table-body-row-cell u-textRight" [innerHtml]="pi | luNumber"></td>
		</tr>
		<tr class="table-body-row">
			<td class="table-body-row-cell">Dix</td>
			<td class="table-body-row-cell u-textRight">{{ ten }}</td>
			<td class="table-body-row-cell u-textRight" [innerHtml]="ten | luNumber"></td>
		</tr>
		<tr class="table-body-row">
			<td class="table-body-row-cell"><span>e</span></td>
			<td class="table-body-row-cell u-textRight">{{ e }}</td>
			<td class="table-body-row-cell u-textRight" [innerHtml]="e | luNumber"></td>
		</tr>
		<tr class="table-body-row">
			<td class="table-body-row-cell">Milliers</td>
			<td class="table-body-row-cell u-textRight">{{ thousands }}</td>
			<td class="table-body-row-cell u-textRight" [innerHtml]="thousands | luNumber"></td>
		</tr>
	</tbody>
</table>

/* 3. Utiliser le pipe luNumber */
@Component({
	selector: 'numbers-stories',
	templateUrl: './numbers.stories.html',
})
class NumbersStory {
	public pi = 3.141592;
	public ten = 10;
	public e = 2.71727;
	public thousands = 12345;
}
`;
export const Basic = template.bind({});
Basic.args = {};

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
