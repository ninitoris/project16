import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent
  },
  {
    path:'users',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: 'edit',
        component: UserEditComponent,
      },
      {
        path: 'edit/:id',
        component: UserEditComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
