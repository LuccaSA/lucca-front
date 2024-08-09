import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'phone-number-input',
  standalone: true,
  imports: [],
  templateUrl: './phone-number-input.component.html',
  styleUrl: './phone-number-input.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhoneNumberInputComponent {

}
