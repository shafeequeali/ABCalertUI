import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {

  constructor(public alertService: AlertsService,private router:Router) { }

  ngOnInit(): void {
  }

  onClickBack() {
    this.router.navigate(['/'])
    // console.log('asddddddddddddddddddddddddddddddddd');
    
  }

}
