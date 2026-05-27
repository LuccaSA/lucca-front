import { computed, Injectable, signal, untracked } from '@angular/core';
import { LuSkipLink } from './skip-link';

@Injectable()
export class SkipLinksService {
	#links = signal<LuSkipLink[]>([]);

	links = computed(() => {
		return [...untracked(this.#links)].sort((a, b) => {
			const pos = a.host.compareDocumentPosition(b.host);
			if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
			if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
			return 0;
		});
	});

	register(link: LuSkipLink) {
		this.#links.set([...untracked(this.links), link]);
	}

	unregister(link: LuSkipLink) {
		this.#links.set(untracked(this.#links).filter((l) => l.id !== link.id));
	}
}
