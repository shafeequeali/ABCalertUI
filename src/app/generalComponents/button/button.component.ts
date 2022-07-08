import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  TAG = 'Button components'

  constructor() { }
  @Input() label?: string
  @Input() klass?: any = ''
  // @Input() path?: any = ''
  // @Output() sendPath?: any = new EventEmitter();
  ngOnInit(): void {
  }

  // onClick() {
  //   console.log({tag:this.TAG + ' onClick'});
    
  //   this.sendPath.emit(this.path)
  // }

}
