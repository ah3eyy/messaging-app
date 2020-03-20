import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './service/auth-guard.services';
import { ConversationComponent } from './conversation/conversation.component';


const routes: Routes = [

  { path: '', component: LoginComponent, pathMatch: 'full' },

  { path: 'dashboard', component: HomeComponent, pathMatch: 'full' , canActivate: [AuthGuard]},

  { path: 'message/:username', component: ConversationComponent, pathMatch: 'full' , canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
