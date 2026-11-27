import { Injectable, signal } from '@angular/core';
import { Harvest, HarvestDraft, initialHarvests } from './harvest-planning.data';

/** Harvests of the planning, shared by the list and the harvest page: a change survives a navigation. */
@Injectable({ providedIn: 'root' })
export class HarvestStore {
	readonly #harvests = signal<Harvest[]>(initialHarvests);
	readonly harvests = this.#harvests.asReadonly();

	#nextId = initialHarvests.length + 1;

	get(id: number): Harvest | undefined {
		return this.#harvests().find((harvest) => harvest.id === id);
	}

	add(draft: HarvestDraft): void {
		this.#harvests.update((harvests) => [{ id: this.#nextId++, ...draft }, ...harvests]);
	}

	update(id: number, draft: HarvestDraft): void {
		this.#harvests.update((harvests) => harvests.map((harvest) => (harvest.id === id ? { id, ...draft } : harvest)));
	}

	remove(id: number): void {
		this.#harvests.update((harvests) => harvests.filter((harvest) => harvest.id !== id));
	}
}
