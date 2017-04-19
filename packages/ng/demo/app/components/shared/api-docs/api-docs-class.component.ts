import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import docs from '../../../../api-docs';
import {ClassDesc, MethodDesc, signature} from './api-docs.model';

/**
 * Displays the API docs of a class, which is not a directive.
 *
 * For Config services, use NgbdApiDocsConfig instead.
 */
@Component({
  selector: 'demo-api-docs-class',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './api-docs-class.component.html',
  styles: [`
    .label-cell {
      width: 25%;
    }
    .content-cell {
      width: 75%;
    }
    `
  ]
})
export class DemoApiDocsClass {
  apiDocs: ClassDesc;

  constructor() {}

  @Input() set type(typeName: string) {
    this.apiDocs = docs[typeName];
  };

  methodSignature(method: MethodDesc): string { return signature(method); }

}
