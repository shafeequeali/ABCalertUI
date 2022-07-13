import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (this.name === 'phone_number') {
      this.isphoneNumber = true
    }
  }

  @Input() klass: string = '';
  @Input() name: any;
  @Input() label: any;
  @Input() value: any;
  @Input() type: any;
  @Input() required?: any;
  @Input() typeError?: string = ''

  note: string = 'Note:Country code is must';

  isphoneNumber: boolean = false;
  // @Input() index: any;
  @Output() setValue = new EventEmitter();

  onChange(e: any) {
    let data = this.setValue.emit({ key: e.target.name, value: e.target.value, })
  }

}
