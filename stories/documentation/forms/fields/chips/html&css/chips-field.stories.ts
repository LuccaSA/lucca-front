import { Meta, StoryObj } from '@storybook/angular-vite';

interface ChipsFieldBasicStory {
	S: boolean;
	invalid: boolean;
	disabled: boolean;
}

export default {
	title: 'Documentation/Forms/Fields/ChipsField/HTML&CSS',
	argTypes: {
		S: { description: 'Taille S (`mod-S` sur `.form-field`).' },
		invalid: { description: 'État en erreur (`aria-invalid="true"` sur le champ de saisie).' },
		disabled: { description: 'État désactivé (`disabled` sur le champ de saisie).' },
	},
} as Meta;

function chip(value: string, { critical = false, unkillable = false, disabled = false } = {}): string {
	const kill = unkillable ? '' : `<button type="button" class="chip-kill"><span class="pr-u-mask">Supprimer</span></button>`;
	const icon = critical ? `<span aria-hidden="true" class="lucca-icon icon-signError"></span><span class="pr-u-mask">Erreur</span>` : '';
	return `<span class="chipsField-chip chip${critical ? ' palette-critical' : ''}${disabled ? ' is-disabled' : ''}">${icon}<span class="chip-content pr-u-ellipsis">${value}</span>${kill}</span>`;
}

function getTemplate({ S, invalid, disabled }: ChipsFieldBasicStory): string {
	const chips = disabled
		? [chip('marie.dupont@example.com', { disabled: true }), chip('contact@example.com', { disabled: true })]
		: [chip('marie.dupont@example.com'), chip('paul.martin@example', { critical: true }), chip('contact@example.com', { unkillable: true })];
	return `<div class="form-field${S ? ' mod-S' : ''}">
	<label class="formLabel" id="IDlabel" for="ID">Destinataires</label>
	<div class="chipsField">
		<div class="chipsField-content">
			${chips.join('\n\t\t\t')}
			<input type="text" id="ID" class="chipsField-input" autocomplete="off" aria-labelledby="IDlabel" aria-describedby="IDmessage" aria-invalid="${invalid}"${disabled ? ' disabled' : ''} />
		</div>
		${disabled ? '' : '<button type="button" class="chipsField-clear clear"><span class="pr-u-mask">Effacer</span></button>'}
	</div>
	<div class="inlineMessage${invalid ? ' is-error' : ''}" id="IDmessage">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">Appuyez sur Entrée, Tab ou virgule pour valider chaque adresse.</p>
	</div>
</div>`;
}

const Template = (args: ChipsFieldBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ChipsFieldBasicStory> = {
	args: { S: false, invalid: false, disabled: false },
	render: Template,
};
