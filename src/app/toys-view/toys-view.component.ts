import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IGX_BUTTON_GROUP_DIRECTIVES, IGX_CARD_DIRECTIVES, IgxButtonDirective, IgxIconButtonDirective, IgxIconComponent, IgxOverlayOutletDirective, IgxRippleDirective, IgxSnackbarComponent, IgxToggleActionDirective, IgxToggleDirective } from 'igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { ToyModel } from '../models/my-api/toy-model';
import { CategoryModelMyAPI } from '../models/my-api/category-model-my-api';
import { MyAPIService } from '../services/my-api.service';

@Component({
  selector: 'app-toys-view',
  standalone: true,
  imports: [IGX_BUTTON_GROUP_DIRECTIVES, IGX_CARD_DIRECTIVES, IgxToggleActionDirective, IgxOverlayOutletDirective, IgxIconButtonDirective, IgxButtonDirective, IgxRippleDirective, IgxToggleDirective, IgxIconComponent, IgxSnackbarComponent, RouterLink],
  templateUrl: './toys-view.component.html',
  styleUrls: ['./toys-view.component.scss']
})
export class ToysViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private _categoryID: number = 1;
  public get categoryID(): number {
    return this._categoryID;
  }
  public set categoryID(value: number) {
    this._categoryID = value;
    this.myAPIToyModel$.next();
  }
  public myAPICategoryModel: CategoryModelMyAPI[] = [];
  public myAPIToyModel: ToyModel[] = [];
  public myAPIToyModel$: Subject<void> = new Subject<void>();


  constructor(
    private myAPIService: MyAPIService,
  ) {}

  ngOnInit() {
    this.myAPIService.getCategoryModelList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.myAPICategoryModel = data
    );
    this.myAPIService.getToyModelList(this.categoryID as any).pipe(takeUntil(this.destroy$)).subscribe(
      data => this.myAPIToyModel = data
    );
    this.myAPIToyModel$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.myAPIService.getToyModelList(this.categoryID as any).pipe(take(1)).subscribe(
        data => this.myAPIToyModel = data
    )});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.myAPIToyModel$.complete();
    this.destroy$.complete();
  }

  public toggleButtonClick(item: CategoryModelMyAPI) {
    this.categoryID = item.id;
  }
}
