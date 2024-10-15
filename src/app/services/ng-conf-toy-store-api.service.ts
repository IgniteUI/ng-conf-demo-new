import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CategoryModel } from '../models/ng-conf-toy-store-api/category-model';
import { ErrorHandlerService } from './error-handler.service';

const API_ENDPOINT = 'https://toystoreapi.appbuilder.dev';

@Injectable({
  providedIn: 'root'
})
export class NgConfToyStoreAPIService {
  constructor(
    private http: HttpClient
  ) { }

  public getCategoryModelList(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${API_ENDPOINT}/api/Toys/categories`)
      .pipe(catchError(ErrorHandlerService.handleError<CategoryModel[]>('getCategoryModelList', [])));
  }
}
