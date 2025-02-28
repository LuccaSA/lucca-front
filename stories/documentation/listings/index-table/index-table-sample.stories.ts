import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { StatusBadgeComponent } from '@lucca-front/ng/statusBadge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Listings/Index Table/Sample',
	decorators: [
		moduleMetadata({
			imports: [LuTooltipModule, IconComponent, ButtonComponent, TagComponent, StatusBadgeComponent, LuUserPictureComponent],
		}),
	],
	render: ({ luButton, ...inputs }, { argTypes }) => {
		return {
			styles: [
				`
						.u-ellipsis {
							display: block !important;
							width: fit-content !important;
							max-width: 100% !important;
						}
					`,
			],
			props: {
				message: (msg) => {
					alert(msg);
				},
			},
			template: `
			<table class="indexTable mod-layoutFixed">
				<thead class="indexTable-head">
					<tr class="indexTable-head-row">
						<th class="indexTable-head-row-cell" scope="col">Action</th>
						<th class="indexTable-head-row-cell" scope="col">Content</th>
						<th class="indexTable-head-row-cell" scope="col">Content</th>
						<th class="indexTable-head-row-cell" scope="col">Content</th>
						<th class="indexTable-head-row-cell" scope="col">Content</th>
						<th class="indexTable-head-row-cell" scope="col">Content</th>
						<th class="indexTable-head-row-cell" scope="col" style="--components-indexTable-cell-fixed-width: 8">Content</th>
						<th class="indexTable-head-row-cell mod-alignRight" scope="col" style="--components-indexTable-cell-fixed-width: 3"><span class="u-mask">Secondary action</span></th>
					</tr>
				</thead>
				<tbody class="indexTable-body">
					<!-- (click) with navigation on table row -->
					<tr class="indexTable-body-row" (click)="message('Primary navigation')">
						<td class="indexTable-body-row-cell u-cursorPointer">
							<!-- real link with navigation and stopPropagation to prevent double navigation -->
							<!-- preventDefault is only here for demonstration -->
							<a href="#primaryNavigation" luTooltip="Primary navigation" class="indexTable-body-row-cell-link u-ellipsis" (click)=" $event.preventDefault(); $event.stopPropagation(); message('Primary navigation')">Link Link Link Link Link Link</a>
						</td>
						<td class="indexTable-body-row-cell u-cursorPointer"><div class="u-ellipsis" luTooltip luTooltipWhenEllipsis>Content with tooltip</div></td>
						<td class="indexTable-body-row-cell u-cursorPointer"><div class="u-ellipsis" luTooltip luTooltipWhenEllipsis>Content with tooltip</div></td>
						<td class="indexTable-body-row-cell u-cursorPointer"><div class="u-ellipsis" luTooltip luTooltipWhenEllipsis>Content with tooltip</div></td>
						<!-- stopPropagation on the table data cell with a mod-allowTextSelection -->
						<td class="indexTable-body-row-cell u-whiteSpaceNowrap mod-allowTextSelection" (click)="$event.stopPropagation()">Selectable</td>
						<!--  u-widthFitContent (or span) to contain the width and center the tooltip -->
						<td class="indexTable-body-row-cell u-cursorPointer"><div class="u-ellipsis u-widthFitContent" luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">Lorem</div></td>
						<td class="indexTable-body-row-cell u-cursorPointer u-whiteSpaceNowrap">Without tooltip</td>
						<!-- stopPropagation on the table data cell with secondary action -->
						<td class="indexTable-body-row-cell mod-alignRight mod-actions" (click)="$event.stopPropagation()"><button luTooltip="Delete" luTooltipOnlyForDisplay class="indexTable-body-row-cell-subAction" type="button" luButton="text" (click)="message('Secondary action')"><lu-icon icon="trash" alt="Delete" /></button></td>
					</tr>
					<!-- (click) with action on table row -->
					<tr class="indexTable-body-row" (click)="message('Primary action')">
						<td class="indexTable-body-row-cell u-cursorPointer">
							<!-- nothing here, the event will be bubbling -->
							<button luTooltip="Primary action" type="button" class="indexTable-body-row-cell-link u-ellipsis">Button Button Button Button Button</button>
						</td>
						<td class="indexTable-body-row-cell u-cursorPointer"><div class="u-ellipsis" luTooltip luTooltipWhenEllipsis>Content with tooltip</div></td>
						<td class="indexTable-body-row-cell u-cursorPointer"><div class="u-ellipsis" luTooltip luTooltipWhenEllipsis>Content with tooltip</div></td>
						<td class="indexTable-body-row-cell u-cursorPointer"><div class="u-ellipsis" luTooltip luTooltipWhenEllipsis>Content with tooltip</div></td>
						<!-- stopPropagation on the table data cell with a mod-allowTextSelection -->
						<td class="indexTable-body-row-cell u-whiteSpaceNowrap mod-allowTextSelection" (click)="$event.stopPropagation()">Selectable</td>
						<!--  u-widthFitContent (or span) to contain de width and center the tooltip -->
						<td class="indexTable-body-row-cell u-cursorPointer"><div class="u-ellipsis u-widthFitContent" luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">Lorem</div></td>
						<td class="indexTable-body-row-cell u-cursorPointer u-whiteSpaceNowrap">Without tooltip</td>
						<!-- stopPropagation on the table data cell with secondary action -->
						<td class="indexTable-body-row-cell mod-alignRight mod-actions" (click)="$event.stopPropagation()"><button luTooltip="Delete" luTooltipOnlyForDisplay class="indexTable-body-row-cell-subAction" type="button" luButton="text" (click)="message('Secondary action')"><lu-icon icon="trash" alt="Delete" /></button></td>
					</tr>
				</tbody>
			</table>
			`,
		};
	},
} as Meta;

export const Basic: StoryObj<ButtonComponent> = {
	argTypes: {
		luButton: {
			options: ['', 'outlined', 'text', 'text-invert'],
			control: {
				type: 'select',
			},
		},
		delete: {
			description: '[v18.1] Couleur critical au hover / focus',
		},
		size: {
			control: {
				type: 'select',
			},
		},
	},
	args: {
		block: false,
		palette: 'none',
		state: 'default',
		luButton: '',
		delete: false,
	},
};
