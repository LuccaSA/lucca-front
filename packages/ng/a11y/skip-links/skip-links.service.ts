import { Injectable } from '@angular/core';
import { LuSkipLink } from './skip-link';

@Injectable()
export class SkipLinksService {
	#links: LuSkipLink[] = [];

	get links() {
		return this.#links;
	}

	register(link: LuSkipLink) {
		this.#links.push(link);
	}

	unregister(link: LuSkipLink) {
		this.#links = this.#links.filter((l) => l.id !== link.id);
	}
}
