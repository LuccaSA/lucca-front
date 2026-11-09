/**
 * A legal unit row. Selecting it is a rule: it covers the establishments it holds today and those
 * created later, which is why it is published as the legal unit itself and never expanded into its
 * establishments.
 */
export interface LuLegalUnitOption {
	kind: 'legalUnit';
	id: number;
	name: string;
}

/** An establishment row. Selecting it covers only itself, so the selection is a fixed list. */
export interface LuEstablishmentOption {
	kind: 'establishment';
	id: number;
	name: string;
	legalUnitId: number;
}

/**
 * The two levels live in the same list, so an option is one or the other. `kind` is what tells them
 * apart everywhere the two would otherwise collide — the option key first of all, since a legal unit
 * and an establishment can share an id.
 */
export type LuLegalUnitEstablishmentOption = LuLegalUnitOption | LuEstablishmentOption;

export function luLegalUnitOption(legalUnit: { id: number; name: string }): LuLegalUnitOption {
	return { kind: 'legalUnit', id: legalUnit.id, name: legalUnit.name };
}

export function luEstablishmentOption(establishment: { id: number; name: string; legalUnitId: number }): LuEstablishmentOption {
	return { kind: 'establishment', id: establishment.id, name: establishment.name, legalUnitId: establishment.legalUnitId };
}

/**
 * The published value. The two levels are kept apart rather than mixed in one array, because a
 * consumer almost always does something different with them: legal units are rules to apply, while
 * establishments are a fixed list.
 */
export interface LuLegalUnitEstablishmentSelection {
	legalUnits: LuLegalUnitOption[];
	establishments: LuEstablishmentOption[];
}

export function luLegalUnitEstablishmentSelection(options: readonly LuLegalUnitEstablishmentOption[]): LuLegalUnitEstablishmentSelection {
	return {
		legalUnits: options.filter((option): option is LuLegalUnitOption => option.kind === 'legalUnit'),
		establishments: options.filter((option): option is LuEstablishmentOption => option.kind === 'establishment'),
	};
}

export function luLegalUnitEstablishmentOptions(selection: LuLegalUnitEstablishmentSelection | null | undefined): LuLegalUnitEstablishmentOption[] {
	// Establishments first, then the rules: a frozen list reads before what covers everything.
	return [...(selection?.establishments ?? []), ...(selection?.legalUnits ?? [])];
}
