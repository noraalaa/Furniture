import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddfurnitureComponent } from './addfurniture/addfurniture.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AuthGuard } from './auth.guard';
import { DetailfurnitureComponent } from './detailfurniture/detailfurniture.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PartfurnitureComponent } from './partfurniture/partfurniture.component';
import { SearchfurnitureComponent } from './searchfurniture/searchfurniture.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'furniture', component:FurnitureComponent,canActivate:[AuthGuard]},
  {path:'addfurniture', component:AddfurnitureComponent,canActivate:[AuthGuard]},
  {path:'searchfurniture', component:SearchfurnitureComponent},
  {path:'partfurniture/:skip', component:PartfurnitureComponent},
  {path:'detailfurniture/:id', component:DetailfurnitureComponent},
  {path:'adduser', component:AdduserComponent},
  {path:'login', component:LoginComponent},
  {path:'logout',component:LogoutComponent},
  //{path:'user', component:UserComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
