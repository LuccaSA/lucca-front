import { Meta } from '@storybook/angular-vite';

interface CollapsableTreeStory {
	multiple: boolean;
	expanded: boolean;
}

export default {
	title: 'Documentation/Forms/Listbox Option/HTML&CSS/Collapsable tree',
	argTypes: {
		multiple: {
			description: 'Ajoute une checkbox à l’option, à côté du chevron.',
		},
		expanded: {
			description: 'Déplie les enfants : `is-expanded` et `aria-expanded="true"` sur l’option.',
		},
	},
	render: (args: CollapsableTreeStory) => {
		const modMultiple = args.multiple ? ` mod-multiple` : ``;
		const isExpanded = args.expanded ? ` is-expanded` : ``;
		return {
			template: `<ul role="tree" class="listboxOptionWrapper${modMultiple}" aria-multiselectable="${args.multiple}">
	<li role="treeitem" class="listboxOption" aria-selected="false">
		<div class="listboxOption-content">
			<span class="listboxOption-content-disclosure" aria-hidden="true"></span>
			<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
				<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			Lucca Software Iberia
		</div>
	</li>
	<li role="treeitem" class="listboxOption mod-collapsable${isExpanded}" aria-expanded="${args.expanded}" aria-selected="false">
		<div class="listboxOption-content">
			<span class="listboxOption-content-disclosure" aria-hidden="true">
				<span aria-hidden="true" class="lucca-icon icon-arrowChevronRight mod-XS listboxOption-content-disclosure-icon"></span>
			</span>
			<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
				<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			Lucca SAS
		</div>
		<ul class="listboxOptionWrapper" role="group">
			<li role="treeitem" class="listboxOption" aria-selected="false">
				<div class="listboxOption-content">
					<span class="listboxOption-content-disclosure" aria-hidden="true"></span>
					<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
						<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					Lucca Brest
				</div>
			</li>
			<li role="treeitem" class="listboxOption" aria-selected="true">
				<div class="listboxOption-content">
					<span class="listboxOption-content-disclosure" aria-hidden="true"></span>
					<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
						<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					Lucca Marseille
				</div>
			</li>
			<li role="treeitem" class="listboxOption mod-collapsable${isExpanded}" aria-expanded="${args.expanded}" aria-selected="false">
				<div class="listboxOption-content">
					<span class="listboxOption-content-disclosure" aria-hidden="true">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronRight mod-XS listboxOption-content-disclosure-icon"></span>
					</span>
					<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
						<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					Lucca Nantes
				</div>
				<ul class="listboxOptionWrapper" role="group">
					<li role="treeitem" class="listboxOption" aria-selected="false">
						<div class="listboxOption-content">
							<span class="listboxOption-content-disclosure" aria-hidden="true"></span>
							<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
								<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
								<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
							</span>
							Lucca Nantes Sud
						</div>
					</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		multiple: true,
		expanded: false,
	},
};
