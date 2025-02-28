import { provideHttpClient } from '@angular/common/http';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/ReadMore/HTML & CSS/Basic',
	argTypes: {
		lineClamp: {
			control: {
				type: 'range',
				min: 2,
				max: 20,
				step: 1,
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [IconComponent, LuTooltipModule],
		}),
		applicationConfig({ providers: [provideHttpClient()] }),
	],
	render: (args, { argTypes }) => {
		const { lineClamp, label, onlyIcon, ..._mainArgs } = args;

		const inlineStyle = `[attr.style]="'--components-readMore-textFlow-lastChild-content: ${label};--components-readMore-lineClamp: ${lineClamp}'"`;

		const buttonLabel = onlyIcon ? `<span class="u-mask">${label}</span>` : label;

		const onlyIconClass = onlyIcon ? `mod-onlyIcon` : ``;

		const tooltip = onlyIcon ? `luTooltip="${label}" luTooltipPosition="before" luTooltipOnlyForDisplay` : ``;

		return {
			props: {
				lineClamp,
				label,
			},
			template: `
<div class="readMore" ${inlineStyle}>
	<button ${tooltip} type="button" onclick="this.getAttribute('aria-expanded') === 'false' ? this.setAttribute('aria-expanded', 'true') : this.setAttribute('aria-expanded', 'false')" aria-hidden="true" aria-expanded="false" class="readMore-button button ${onlyIconClass}">
		${buttonLabel}
		<lu-icon icon="chevronBottom" />
	</button>
	<div class="readMore-textFlow textFlow">
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos ut maiores ullam facere voluptatum odio eum? Debitis natus nulla fugit
				<a href="#">deleniti</a>
				esse ipsum sint voluptatibus! Debitis voluptates impedit blanditiis natus.
			</p>
			<p>
				Vitae veritatis non aliquam obcaecati illum voluptatum, voluptas dignissimos perspiciatis velit odit, magnam
				<a href="#">aspernatur</a>
				culpa totam nemo, magni cum? Magni sapiente voluptatibus temporibus. Quas reprehenderit deleniti sit veniam, molestias obcaecati.
			</p>
			<p >
				Explicabo deleniti perspiciatis inventore odit ratione et illum temporibus, culpa facilis debitis porro delectus,
				<a href="#">accusamus</a>
				perferendis ducimus reiciendis. Voluptatem nam nemo quia sint quisquam! Possimus itaque quae eius labore neque it.
			</p>
	</div>
</div>

			`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		lineClamp: 5,
		label: 'Lire la suite',
		onlyIcon: false,
	},
};
