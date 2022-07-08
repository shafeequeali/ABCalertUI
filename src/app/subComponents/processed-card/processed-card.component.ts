import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StrureElement } from '../view-content/view-content.component';

@Component({
  selector: 'app-processed-card',
  templateUrl: './processed-card.component.html',
  styleUrls: ['./processed-card.component.css']
})
export class ProcessedCardComponent implements OnInit {
  TAG = 'ProcessedCardComponent'
  constructor() { }

  @Input() data: any | undefined;
  @Input() index: number | undefined;
  @Output() deleteTrigger = new EventEmitter();

  ngOnInit(): void {
    console.log({ tag: this.TAG, data: this.data });

  }

  onClickDelete() {
    this.deleteTrigger.emit(this.data)
  }

}
