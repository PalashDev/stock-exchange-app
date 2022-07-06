import { company } from 'src/app/Models/company';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private httpClient: HttpClient) { }
  private apiURL = "http://localhost:56985";
    
  /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public saveCompany(requestData: any): Observable<any> {
    console.log(requestData);
    var date =   new company('company1','CNCTGD', 'Tiger', 1000, 'tgt.kz', 'BSE');
    return this.httpClient.post<any>(this.apiURL + '/api/v1.0/market/company/register',  date)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  public saveStock(requestStockData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL+ '/saveStock/', requestStockData,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
 

  
}
