import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { systemConfig } from './helper/utility';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}
  private TAG: string = 'UPLOAD SERVICE';
  private hotAddress = systemConfig.hostAddress;
  public isLoadingApi = false;

  uploadData(data: any, url: string, type?: string, callback?: Function): void {
    this.isLoadingApi = true;
    const URL = this.hotAddress + url;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.parse(JSON.stringify(data));
    if (type === 'post') {
      this.http.post(URL, body, { headers }).subscribe((data) => {
        this.isLoadingApi = false;
        window.alert('Alert created  successfully');
      });
    } else if (type === 'put') {
      this.http.put(URL, body, { headers }).subscribe((data) => {
        this.isLoadingApi = false;
        window.alert('Alert uploaded successfully');
      });
    } else if (type === 'delete') {
      this.http.delete(URL).subscribe((data) => {
        // window.alert('Alert deleted successfully');
        this.isLoadingApi = false;
        callback && callback();
      });
    } else if (type === 'send') {
      this.http.post(URL, body, { headers }).subscribe((data) => {
        // window.alert('Alert created  successfully');
        this.isLoadingApi = false;
        callback && callback();
        // document.write("")
      });
    } else {
      this.http.post(URL, body, { headers }).subscribe((data) => {
        this.isLoadingApi = false;
        window.alert('Application created successfully');
      });
    }
  }
  downLoadData(url: string): Observable<any> {
    this.isLoadingApi = true;
    const URL = this.hotAddress + url;
    const data = this.http.get(URL);
    this.isLoadingApi = false;
    return data;
  }

  uploadFileBodyLess(file: any): Observable<any> {
    this.isLoadingApi = true;

    const URL = this.hotAddress + 'alert/csv';
    console.log({ tag: 'service-uploadFile', name: file });

    // const headers = { 'content-type': 'multipart/form-data' }

    let headers1 = new HttpHeaders({
      Accept: 'application/json',
    });

    // const bodyData = JSON.stringify(body);

    const formData = new FormData();
    formData.append('file', file, file.name);
    // formData.append("editData", bodyData);

    // observe: 'events'
    // reportProgress: true,

    const data = this.http.post(URL, formData, {
      headers: headers1,
    });
    this.isLoadingApi = false;

    return data;
  }

  uploadFile(file: any, body: any) {
    this.isLoadingApi = true;

    console.log({ tag: 'service-uploadFile', name: file, body });
    const URL = this.hotAddress + 'file';

    // const headers = { 'content-type': 'multipart/form-data' }

    let headers1 = new HttpHeaders({
      Accept: 'application/json',
    });

    const bodyData = JSON.stringify(body);

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('editData', bodyData);

    // observe: 'events'
    // reportProgress: true,
    this.http.post(URL, formData, { headers: headers1 }).subscribe((data) => {
      // console.log(data);
      this.isLoadingApi = false;
      window.alert('Application uploaded successfully');
    });
  }
}
