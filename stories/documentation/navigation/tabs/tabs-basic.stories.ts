import { Meta, StoryFn } from '@storybook/angular';

interface TabsBasicStory {
	size: string;
	withNumericBadge: boolean;
	modVertical: boolean;
}

export default {
	title: 'Documentation/Navigation/Tabs/Basic',
	argTypes: {
		size: {
			options: ['', 'mod-S', 'mod-XS'],
			control: {
				type: 'select',
			},
		},
		tabActive: {
			control: {
				min: 1,
				max: 4,
				type: 'number',
			},
		},
		withNumericBadge: {
			control: {
				type: 'boolean',
			},
		},
		modVertical: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: TabsBasicStory): string {
	return `
<ul class="tablist ${args.size} ${args.modVertical ? 'mod-vertical' : null}" role="tablist">
	<li class="tablist-item" role="presentation">
		<button class="tablist-item-tab" type="button" role="tab" id="tab1" [attr.aria-selected]="tabActive === 1" aria-controls="panel1" [attr.tabindex]="tabActive === 1 ? null : '-1'">
			Lorem
		</button>
	</li>
	<li class="tablist-item" role="presentation">
		<button class="tablist-item-tab" type="button" role="tab" id="tab2" [attr.aria-selected]="tabActive === 2" aria-controls="panel2" [attr.tabindex]="tabActive === 2 ? null : '-1'">
			Ipsum
			<span class="numericBadge" *ngIf="withNumericBadge">8</span>
		</button>
	</li>
	<li class="tablist-item" role="presentation">
		<button class="tablist-item-tab" type="button" role="tab" id="tab3" [attr.aria-selected]="tabActive === 3" aria-controls="panel3" [attr.tabindex]="tabActive === 3 ? null : '-1'">
			Dolor sit amet
			<span class="numericBadge" *ngIf="withNumericBadge">88</span>
		</button>
	</li>
	<li class="tablist-item" role="presentation">
		<button class="tablist-item-tab" type="button" role="tab" id="tab4" [attr.aria-selected]="tabActive === 4" aria-controls="panel4" [attr.tabindex]="tabActive === 4 ? null : '-1'">
			Consectetur adipisicing elit
		</button>
	</li>
</ul>

<div class="u-marginTopM"></div>

<div class="tabpanel" [class.active]="tabActive === 1" role="tabpanel" id="panel1" aria-labelledby="tab1" tabindex="0">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, maxime animi perferendis explicabo est eaque ipsa rem, sit quasi sunt corporis iure distinctio. Deleniti deserunt aspernatur est placeat, assumenda provident.
</div>

<div class="tabpanel" [class.active]="tabActive === 2" role="tabpanel" id="panel2" aria-labelledby="tab2" tabindex="0">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, cumque ad inventore maiores possimus in commodi ea soluta maxime fugiat libero ducimus provident incidunt sit quod! Cum dolorem tempora sit?
</div>

<div class="tabpanel" [class.active]="tabActive === 3" role="tabpanel" id="panel3" aria-labelledby="tab3" tabindex="0">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita optio voluptates distinctio nam facere consequatur magni suscipit dolore earum molestiae esse placeat commodi, voluptas atque. Maxime, molestiae. Doloremque, reprehenderit numquam.
</div>

<div class="tabpanel" [class.active]="tabActive === 4" role="tabpanel" id="panel4" aria-labelledby="tab4" tabindex="0">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias amet placeat deserunt nisi. Vitae delectus animi a voluptate, nisi voluptatum perspiciatis? Quisquam quam, eius molestiae vitae nesciunt iste est non.
</div>
	`;
}

const Template: StoryFn<TabsBasicStory> = (args: TabsBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	size: '',
	tabActive: 1,
	withNumericBadge: false,
	modVertical: false,
};
