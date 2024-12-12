import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';

@Component({
  selector: 'lu-select-schematic-external-html',
  standalone: true,
  templateUrl: './external-html.component.html',
  imports: [FormsModule, LuSimpleSelectInputComponent]
})
export class SimpleCaseInputComponent {
  cultures = [
    {
      name: 'Français',
      code: 'fr-FR'
    }
  ];

  selectedCulture = null;

  defaultOnly = false;

  onCultureChanges(): void {
  }
}
