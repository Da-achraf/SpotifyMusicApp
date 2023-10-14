import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './components/items/items.component';
import { WelcomingComponent } from './components/welcoming/welcoming.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcoming', pathMatch: 'full' },
  { path: 'items', component: ItemsComponent },
  { path: 'welcoming', component: WelcomingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
