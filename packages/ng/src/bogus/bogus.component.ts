import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


/**
 * This is a bogus component with bogus documentation
 */
@Component({
  selector: 'lu-bogus',
  templateUrl: './bogus.component.html',
  styleUrls: ['./bogus.component.scss']
})
export class BogusComponent implements OnInit {

  /**
   * a bogus input
   */
  @Input() bogusInput: number = 0;
  /**
   * another bogus input
   */
  @Input() bogusLol: string = "rofl";
  /**
   * a bogus output
   */
  @Output() bougusOutput = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public lol = 'mdr'
}
