import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderServiceService } from '../services/header-service.service'
@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnChanges, OnInit {
  TAG = 'HEADET BAR COMPONENT'
  constructor(private route: Router, public headerService: HeaderServiceService) { }

  // path = this.route.url;
  ngOnInit(): void {
    // console.log({ tag: this.TAG + ' ngOnInit', header: this.headerService.headerTitle });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.headerService.headerTitle === 'testtttee') {
    //   console.log({ tag: this.TAG + ' ngOnChanges', header: this.headerService.headerTitle });
    // }
    // // this.tittle = this.headerService.headerTitle
  }


}
