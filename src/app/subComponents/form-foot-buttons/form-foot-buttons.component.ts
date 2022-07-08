import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-foot-buttons',
  templateUrl: './form-foot-buttons.component.html',
  styleUrls: ['./form-foot-buttons.component.css']
})
export class FormFootButtonsComponent implements OnInit {

  constructor() { }
  @Input() isItEditSession: boolean | undefined = false;
  @Output() setCreate = new EventEmitter();
  @Output() setUpdate = new EventEmitter();
  @Output() setPreview = new EventEmitter();
  @Output() setDelete = new EventEmitter();


  ngOnInit(): void {
  }
  onClickCreate() {
    this.setCreate.emit()
  }
  onClickUpdate() {
    this.setUpdate.emit()

  }
  onClickPreview() {
    this.setPreview.emit()

  }
  onClickDelete() {
    this.setDelete.emit()
  }
}
