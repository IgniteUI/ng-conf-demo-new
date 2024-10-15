import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  /**
  * Handle Http operation that failed.
  * Let the app continue.

  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  public static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: Transform error for user consumption, e.g. show toast message
      console.error(`${operation} failed: ${error.message}`);
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
