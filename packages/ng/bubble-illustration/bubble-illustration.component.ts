import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';

@Component({
	selector: 'lu-bubble-illustration',
	templateUrl: './bubble-illustration.component.html',
	styleUrl: './bubble-illustration.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe],
})
export class BubbleIllustrationComponent {
	readonly illustration = input<string>('absence');
	readonly size = input<'XS' | 'S' | 'L' | ''>('');
	readonly action = input(false, { transform: booleanAttribute });
	readonly illustrationUrl = computed(() => `https://tmp.vincent-valentin.name/lucca/bubble-illustrations/${this.illustration()}.svg`);
}
