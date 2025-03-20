import { booleanAttribute, Component, ElementRef, HostBinding, input, OnInit, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';

@Component({
	selector: 'lu-read-more',
	standalone: true,
	templateUrl: './read-more.component.html',
	styleUrls: ['./read-more.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, LuTooltipModule],
	host: {
		class: 'readMore',
	},
})
export class ReadMoreComponent implements OnInit {
	lineClamp = input<number>(5);
	label = input<string>('Lire la suite');
	onlyIcon = input<boolean, boolean>(false, { transform: booleanAttribute });

	textFlowRef = viewChild<ElementRef<HTMLDivElement>>('textFlow');

	expanded = signal(false);
	isClamped = signal(false);

	@HostBinding('style.--components-readMore-lineClamp') get lines() {
		return this.lineClamp();
	}

	@HostBinding('style.--components-readMore-textFlow-lastChild-content') get labelText() {
		if (this.onlyIcon()) {
			return `""`;
		}
		return `"${this.label()}"`;
	}

	@HostBinding('class.is-disabled') get isDisabled() {
		return !this.expanded() && !this.isClamped();
	}

	ngOnInit(): void {
		new ResizeObserver(() => {
			const textFlowElement = this.textFlowRef()?.nativeElement;

			this.isClamped.set(textFlowElement.scrollHeight > textFlowElement.clientHeight);
		}).observe(this.textFlowRef().nativeElement);
	}
}
