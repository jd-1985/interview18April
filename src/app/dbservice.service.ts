import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  private REST_API_SERVER = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendSearchRequest(){
    return this.httpClient.post<any[]>(this.REST_API_SERVER + '/search',{
      name: ''
    }).pipe(catchError(this.handleError));
  }

  public addEmployee(employees : any[]){
    //alert(JSON.stringify(employee))
    /*return this.httpClient.post<any[]>(this.REST_API_SERVER + '/add',{
      firstname: employee.firstname,
      lastname: employee.lastname,
      email: employee.email,
      mobile: employee.mobile,

    }).pipe(catchError(this.handleError));
*/
   // alert('data before service' + JSON.stringify(employees))
    return this.httpClient.post<any[]>(this.REST_API_SERVER + '/add',employees).pipe(catchError(this.handleError));
  }

  public deleteEmployee(id : number){
    //alert(id)
    return this.httpClient.post<any[]>(this.REST_API_SERVER + '/delete',{id:id}).pipe(catchError(this.handleError));
  }



}

