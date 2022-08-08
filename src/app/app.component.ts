import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'send-alert-app';

  constructor(private router: Router, public uploadService: UploadService) {}
  ngOnInit(): void {
    this.router.navigate(['']);
  }
}
