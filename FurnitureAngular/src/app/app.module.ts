import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { AddfurnitureComponent } from './addfurniture/addfurniture.component';
import { SearchfurnitureComponent } from './searchfurniture/searchfurniture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartfurnitureComponent } from './partfurniture/partfurniture.component';
import { DetailfurnitureComponent } from './detailfurniture/detailfurniture.component';
import { MaxLengthPipe } from './max-length.pipe';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RatingComponent } from './shared/rating/rating.component';
import { CardproductComponent } from './shared/cardproduct/cardproduct.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AdduserComponent } from './adduser/adduser.component';
// import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    FurnitureComponent,
    AddfurnitureComponent,
    SearchfurnitureComponent,
    PartfurnitureComponent,
    DetailfurnitureComponent,
    MaxLengthPipe,
    HeaderComponent,
    FooterComponent,
    RatingComponent,
    CardproductComponent,
    LoginComponent,
    LogoutComponent,
    AdduserComponent,
    // UserComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
