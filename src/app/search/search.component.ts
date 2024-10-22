import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IGX_CARD_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IgxButtonDirective, IgxOverlayOutletDirective, IgxRippleDirective, IgxToggleActionDirective, IgxToggleDirective } from 'igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { ToyModel } from '../models/ng-conf-toy-store-api/toy-model';
import { NgConfToyStoreAPIService } from '../services/ng-conf-toy-store-api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [IGX_INPUT_GROUP_DIRECTIVES, IGX_CARD_DIRECTIVES, IgxToggleActionDirective, IgxOverlayOutletDirective, IgxButtonDirective, IgxRippleDirective, IgxToggleDirective, RouterLink, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private _searchToy: string = 'toy';
  public get searchToy(): string {
    return this._searchToy;
  }
  public set searchToy(value: string) {
    this._searchToy = value;
    this.ngConfToyStoreAPIToyModel$.next();
  }
  public ngConfToyStoreAPIToyModel: ToyModel[] = [];
  public ngConfToyStoreAPIToyModel$: Subject<void> = new Subject<void>();


  constructor(
    private ngConfToyStoreAPIService: NgConfToyStoreAPIService,
  ) {}

  ngOnInit() {
    this.ngConfToyStoreAPIService.getToyModelList(this.searchToy).pipe(takeUntil(this.destroy$)).subscribe(
      data => this.ngConfToyStoreAPIToyModel = data
    );
    this.ngConfToyStoreAPIToyModel$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.ngConfToyStoreAPIService.getToyModelList(this.searchToy).pipe(take(1)).subscribe(
        data => this.ngConfToyStoreAPIToyModel = data
    )});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.ngConfToyStoreAPIToyModel$.complete();
    this.destroy$.complete();
  }
}
