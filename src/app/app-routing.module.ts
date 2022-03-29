import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDataComponent } from './pages/all-data/all-data.component';
import { SingleDataComponent } from './pages/single-data/single-data.component';
const routes: Routes = [
  {path:"", component:AllDataComponent}, 
  {path:":id", component:SingleDataComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
