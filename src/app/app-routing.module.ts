import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearcheddetailsComponent } from './searcheddetails/searcheddetails.component';
import { ShowdetailsComponent } from './showdetails/showdetails.component';

const routes: Routes = [
  { path: '', redirectTo:'Dashboard' , pathMatch: 'full', },
  { path: 'Dashboard', component:DashboardComponent },
  { path: 'ShowDetails/:id', component:ShowdetailsComponent },
  { path: 'Search/:SearchText', component:SearcheddetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
