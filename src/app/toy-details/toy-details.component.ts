import { Component, Input, numberAttribute, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IGX_INPUT_GROUP_DIRECTIVES, IgxButtonDirective, IgxIconComponent, IgxOverlayOutletDirective, IgxRippleDirective, IgxToggleActionDirective, IgxToggleDirective } from 'igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { ToyModel } from '../models/my-api/toy-model';
import { MyAPIService } from '../services/my-api.service';

@Component({
  selector: 'app-toy-details',
  standalone: true,
  imports: [IGX_INPUT_GROUP_DIRECTIVES, IgxToggleActionDirective, IgxOverlayOutletDirective, IgxButtonDirective, IgxRippleDirective, IgxToggleDirective, IgxIconComponent, RouterLink],
  templateUrl: './toy-details.component.html',
  styleUrls: ['./toy-details.component.scss']
})
export class ToyDetailsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public toyFromRequest?: ToyModel;
  public toyFromRequest$: Subject<void> = new Subject<void>();


  private _toyID: number = 102;
  @Input({ transform: numberAttribute })
  public get toyID(): number {
    return isNaN(this._toyID as any) ? 102 : this._toyID;
  }
  public set toyID(value: number) {
    this._toyID = value;
    this.toyFromRequest$.next();
  }

  constructor(
    private myAPIService: MyAPIService,
  ) {}

  ngOnInit() {
    this.myAPIService.getToyModel(this.toyID as any).pipe(takeUntil(this.destroy$)).subscribe(
      data => this.toyFromRequest = data
    );
    this.toyFromRequest$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.myAPIService.getToyModel(this.toyID as any).pipe(take(1)).subscribe(
        data => this.toyFromRequest = data
    )});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.toyFromRequest$.complete();
    this.destroy$.complete();
  }
}
