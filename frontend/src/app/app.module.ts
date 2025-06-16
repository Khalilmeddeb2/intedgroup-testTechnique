import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { AuthGuard } from './_guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TemplateComponent } from './template/template/template.component';
import { RolesComponent } from './template/template/roles/roles.component';
import { AccueilComponent } from './template/template/accueil/accueil.component';
import { ArticlesComponent } from './template/template/articles/articles.component';
import { PopupRoleAddEditComponent } from './modals/popup-role-add-edit/popup-role-add-edit.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddArticleComponent } from './template/template/articles/add-article/add-article.component';
import { EditArticleComponent } from './template/template/articles/edit-article/edit-article.component';
import { Ng2IziToastModule } from 'ng2-izitoast';
import { DetailsArticleComponent } from './template/template/articles/details-article/details-article.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    TemplateComponent,
    RolesComponent,
    AccueilComponent,
    ArticlesComponent,
    PopupRoleAddEditComponent,
    AddArticleComponent,
    EditArticleComponent,
    DetailsArticleComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2IziToastModule,

  ],
  providers: [AuthGuard,{
    provide :HTTP_INTERCEPTORS,
    useClass :TokenInterceptorService,
    multi:true
  },
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
