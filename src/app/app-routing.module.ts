import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo: `square`,
    pathMatch: 'full',
  },
  {
    path: 'square',
    loadChildren: () => import('./square/square.module').then(m => m.SquareModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
