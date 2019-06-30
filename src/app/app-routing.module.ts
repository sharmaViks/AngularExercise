import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventBookComponent } from './event-book/event-book.component';

const routes: Routes = [
  {path:'',component:EventListComponent,pathMatch:'full'},
  {path:'bookevent/:name',component:EventBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
