import {Component} from '@angular/core';
import {DEMO_SNIPPETS} from './demos';

@Component({
  selector: 'demo-bogus',
  template: `
    <demo-api-docs directive="BogusComponent"></demo-api-docs>

    <demo-example-box [snippets]="snippets" component="bogus" demo="basic">
      <demo-bogus-basic></demo-bogus-basic>
    </demo-example-box>
  `,
})
export class DemoBogusComponent {
  snippets = DEMO_SNIPPETS;
}
