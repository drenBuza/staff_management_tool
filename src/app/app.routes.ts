import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StaffListComponent } from './pages/staff-list/staff-list.component';
import { StaffDetailComponent } from './pages/staff-detail/staff-detail.component';
import { AddStaffComponent } from './pages/add-staff/add-staff.component';
import { EditStaffComponent } from './pages/edit-staff/edit-staff.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'staff', component: StaffListComponent },
  { path: 'staff/add', component: AddStaffComponent },
  { path: 'staff/edit/:id', component: EditStaffComponent },
  { path: 'staff/:id', component: StaffDetailComponent },
  { path: '**', component: NotFoundComponent } // Catch-all for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }