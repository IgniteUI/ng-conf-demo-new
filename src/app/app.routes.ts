import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { ToysViewComponent } from './toys-view/toys-view.component';
import { ToyDetailsComponent } from './toy-details/toy-details.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: 'toys-view', pathMatch: 'full' },
  { path: 'error', component: UncaughtErrorComponent },
  {
    path: 'toys-view',
    component: ToysViewComponent,
    data: {
      text: 'Toys view'
    }
  },
  {
    path: 'toy-details',
    component: ToyDetailsComponent,
    data: {
      text: 'Toy details'
    }
  },
  {
    path: 'toy-details/:toyID',
    component: ToyDetailsComponent,
    data: {
      text: 'Toy details'
    }
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    data: {
      text: 'Admin panel'
    }
  },
  {
    path: 'search',
    component: SearchComponent,
    data: {
      text: 'Search'
    }
  },
  { path: '**', component: PageNotFoundComponent } // must always be last
];
