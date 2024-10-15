import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IGX_CARD_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IgxButtonDirective, IgxOverlayOutletDirective, IgxRippleDirective, IgxToggleActionDirective, IgxToggleDirective } from 'igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { ToyModel } from '../models/my-api/toy-model';
import { MyAPIService } from '../services/my-api.service';

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
    this.myAPIToyModel$.next();
  }
  public myAPIToyModel: ToyModel[] = [];
  public myAPIToyModel$: Subject<void> = new Subject<void>();


  constructor(
    private myAPIService: MyAPIService,
  ) {}

  ngOnInit() {
    this.myAPIService.getToyModelList2(this.searchToy).pipe(takeUntil(this.destroy$)).subscribe(
      data => this.myAPIToyModel = data
    );
    this.myAPIToyModel$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.myAPIService.getToyModelList2(this.searchToy).pipe(take(1)).subscribe(
        data => this.myAPIToyModel = data
    )});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.myAPIToyModel$.complete();
    this.destroy$.complete();
  }
}
