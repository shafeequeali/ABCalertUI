import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-hml',
  templateUrl: './input-hml.component.html',
  styleUrls: ['./input-hml.component.css']
})
export class InputHmlComponent {

  constructor() { }

  @Input() klass: string = '';

  @Input() name: any;
  @Input() label: any;
  @Input() type: any;
  @Input() required?: any;
  @Input() typeError?: string = ''


  // @Input() index: any;
  @Output() setValue = new EventEmitter();

  onChange(e: any) {
    let data = this.setValue.emit({ key: e.target.name, value: e.target.value, })
  }

}
