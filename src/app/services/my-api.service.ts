import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ToyModelMyAPI } from '../models/my-api/toy-model-my-api';
import { CategoryModelMyAPI } from '../models/my-api/category-model-my-api';
import { ErrorHandlerService } from './error-handler.service';

const API_ENDPOINT = 'https://toystoreapi.appbuilder.dev';

@Injectable({
  providedIn: 'root'
})
export class MyAPIService {
  constructor(
    private http: HttpClient
  ) { }

  public getCategoryModelList(): Observable<CategoryModelMyAPI[]> {
    return this.http.get<CategoryModelMyAPI[]>(`${API_ENDPOINT}/api/Toys/categories`)
      .pipe(catchError(ErrorHandlerService.handleError<CategoryModelMyAPI[]>('getCategoryModelList', [])));
  }

  public getToyModelList(categoryId: number): Observable<ToyModelMyAPI[]> {
    const params = new HttpParams()
      .append('categoryId', categoryId);
    const options = {
      params,
    };
    return this.http.get<ToyModelMyAPI[]>(`${API_ENDPOINT}/api/Toys/toysByCategoryID`, options)
      .pipe(catchError(ErrorHandlerService.handleError<ToyModelMyAPI[]>('getToyModelList', [])));
  }

  public getToyModel(id: number): Observable<ToyModelMyAPI | undefined> {
    if (!id) {
      return of(undefined);
    }
    return this.http.get<ToyModelMyAPI | undefined>(`${API_ENDPOINT}/api/Toys/${id}`)
      .pipe(catchError(ErrorHandlerService.handleError<ToyModelMyAPI | undefined>('getToyModel', undefined)));
  }

  public getToyModelList1(): Observable<ToyModelMyAPI[]> {
    return this.http.get<ToyModelMyAPI[]>(`${API_ENDPOINT}/api/Toys/allToys`)
      .pipe(catchError(ErrorHandlerService.handleError<ToyModelMyAPI[]>('getToyModelList1', [])));
  }

  public postToyModel(data: any): Observable<ToyModelMyAPI | undefined> {
    if (!data) {
      return of(undefined);
    }
    const body = data;
    return this.http.post<ToyModelMyAPI | undefined>(`${API_ENDPOINT}/api/Toys/createToy`, body)
      .pipe(catchError(ErrorHandlerService.handleError<ToyModelMyAPI | undefined>('postToyModel', undefined)));
  }

  public deleteToyModel(id: number): Observable<ToyModelMyAPI | undefined> {
    const params = new HttpParams()
      .append('id', id);
    const options = {
      params,
    };
    return this.http.delete<ToyModelMyAPI | undefined>(`${API_ENDPOINT}/api/Toys/deleteToyById`, options)
      .pipe(catchError(ErrorHandlerService.handleError<ToyModelMyAPI | undefined>('deleteToyModel', undefined)));
  }

  public putToyModel(data: any): Observable<ToyModelMyAPI | undefined> {
    if (!data) {
      return of(undefined);
    }
    const body = data;
    return this.http.put<ToyModelMyAPI | undefined>(`${API_ENDPOINT}/api/Toys/updateToy`, body)
      .pipe(catchError(ErrorHandlerService.handleError<ToyModelMyAPI | undefined>('putToyModel', undefined)));
  }
}
