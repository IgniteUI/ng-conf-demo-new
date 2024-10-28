import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ToyModel } from '../models/my-api/toy-model';
import { CategoryModel } from '../models/my-api/category-model';
import { ErrorHandlerService } from './error-handler.service';

const API_ENDPOINT = 'https://toystoreapi.appbuilder.dev';

@Injectable({
  providedIn: 'root'
})
export class MyAPIService {
  constructor(
    private http: HttpClient
  ) { }

  public getCategoryModelList(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${API_ENDPOINT}/api/Toys/categories`)
      .pipe(catchError(ErrorHandlerService.handleError<CategoryModel[]>('getCategoryModelList', [])));
  }

  public getToyModelList(categoryId: number): Observable<ToyModel[]> {
    const params = new HttpParams()
      .append('categoryId', categoryId);
    const options = {
      params,
    };
    return this.http.get<ToyModel[]>(`${API_ENDPOINT}/api/Toys/toysByCategoryID`, options)
      .pipe(catchError(ErrorHandlerService.handleError<ToyModel[]>('getToyModelList', [])));
  }

  public getToyModel(id: number): Observable<ToyModel | undefined> {
    if (!id) {
      return of(undefined);
    }
    return this.http.get<ToyModel | undefined>(`${API_ENDPOINT}/api/Toys/${id}`)
      .pipe(catchError(ErrorHandlerService.handleError<ToyModel | undefined>('getToyModel', undefined)));
  }

  public getToyModelList1(): Observable<ToyModel[]> {
    return this.http.get<ToyModel[]>(`${API_ENDPOINT}/api/Toys/allToys`)
      .pipe(catchError(ErrorHandlerService.handleError<ToyModel[]>('getToyModelList1', [])));
  }

  public postToyModel(data: any): Observable<ToyModel | undefined> {
    if (!data) {
      return of(undefined);
    }
    const body = data;
    return this.http.post<ToyModel | undefined>(`${API_ENDPOINT}/api/Toys/createToy`, body)
      .pipe(catchError(ErrorHandlerService.handleError<ToyModel | undefined>('postToyModel', undefined)));
  }

  public deleteToyModel(id: number): Observable<ToyModel | undefined> {
    const params = new HttpParams()
      .append('id', id);
    const options = {
      params,
    };
    return this.http.delete<ToyModel | undefined>(`${API_ENDPOINT}/api/Toys/deleteToyById`, options)
      .pipe(catchError(ErrorHandlerService.handleError<ToyModel | undefined>('deleteToyModel', undefined)));
  }

  public putToyModel(data: any): Observable<ToyModel | undefined> {
    if (!data) {
      return of(undefined);
    }
    const body = data;
    return this.http.put<ToyModel | undefined>(`${API_ENDPOINT}/api/Toys/updateToy`, body)
      .pipe(catchError(ErrorHandlerService.handleError<ToyModel | undefined>('putToyModel', undefined)));
  }

  public getToyModelList2(name: string): Observable<ToyModel[]> {
    const params = new HttpParams()
      .append('name', name);
    const options = {
      params,
    };
    return this.http.get<ToyModel[]>(`${API_ENDPOINT}/api/Toys/getToyByName`, options)
      .pipe(catchError(ErrorHandlerService.handleError<ToyModel[]>('getToyModelList2', [])));
  }
}
