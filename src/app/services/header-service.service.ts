import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderServiceService {

  constructor() { }

  headerTitle: string = 'View Alerts'

  gettHeaderTitle() {
    return this.headerTitle
  }

  setHeaderTitle(title: string) {
    this.headerTitle = title;
  }

}
