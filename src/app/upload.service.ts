import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }
  private TAG: string = 'UPLOAD SERVICE';



  uploadData(data: any, url: string, type?: string, callback?: Function): void {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.parse(JSON.stringify(data));
    if (type === 'post') {
      this.http.post(url, body, { headers }).subscribe((data) => {
        window.alert('Alert created  successfully');
      })
    } else if (type === 'put') {
      this.http.put(url, body, { headers }).subscribe((data) => {
        window.alert('Alert uploaded successfully');
      })
    }
    else if (type === 'delete') {
      this.http.delete(url).subscribe((data) => {
        // window.alert('Alert deleted successfully');
        callback && callback()
      })
    }
    else if (type === 'send') {
      this.http.post(url, body, { headers }).subscribe((data) => {
        // window.alert('Alert created  successfully');
        callback && callback()
        // document.write("")
      }
      )
    }
    else {
      this.http.post(url, body, { headers }).subscribe((data) => {
        window.alert('Application created successfully');
      })
    }


  }
  downLoadData(url: string): Observable<any> {
    return this.http.get(url);
  }

  uploadFileBodyLess(file: any): Observable<any> {
    console.log({ tag: 'service-uploadFile', name: file });

    // const headers = { 'content-type': 'multipart/form-data' }

    let headers1 = new HttpHeaders({
      Accept: 'application/json',
    })

    // const bodyData = JSON.stringify(body);

    const formData = new FormData();
    formData.append("file", file, file.name);
    // formData.append("editData", bodyData);


    // observe: 'events'
    // reportProgress: true,
    return this.http.post('http://localhost:3000/alert/csv', formData, { headers: headers1 })

  }

  uploadFile(file: any, body: any) {
    console.log({ tag: 'service-uploadFile', name: file, body });

    // const headers = { 'content-type': 'multipart/form-data' }

    let headers1 = new HttpHeaders({
      Accept: 'application/json',
    })

    const bodyData = JSON.stringify(body);

    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("editData", bodyData);


    // observe: 'events'
    // reportProgress: true,
    this.http.post('http://localhost:3000/file', formData, { headers: headers1 }).subscribe(data => {
      console.log(data);
      window.alert('Application uploaded successfully');
    }
    )
  }
}
