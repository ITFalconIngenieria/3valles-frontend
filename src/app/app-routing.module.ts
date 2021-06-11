import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JerarquiaComponent } from './pages/jerarquia/jerarquia.component';
import { LoginComponent } from './pages/login/login.component';
import { MedidorComponent } from './pages/medidor/medidor.component';
import { MenuComponent } from './pages/menu/menu.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'welcome',component: WelcomeComponent},
  { path: 'medidor', component: MedidorComponent},
  { path: 'jerarquia', component: JerarquiaComponent}
 // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
