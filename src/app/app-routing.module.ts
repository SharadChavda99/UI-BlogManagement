import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BlogMainComponent } from './Components/blog-main/blog-main.component';
import { BlogAddEditComponent } from './Components/blog-add-edit/blog-add-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: BlogMainComponent,
  },
  {
    path: 'add',
    component: BlogAddEditComponent,
  },
  {
    path: 'edit/:blogId',
    component: BlogAddEditComponent,
  },
  {
    path: '**',
    component: BlogMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
