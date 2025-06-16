import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TemplateComponent } from './template/template/template.component';
import { AccueilComponent } from './template/template/accueil/accueil.component';
import { RolesComponent } from './template/template/roles/roles.component';
import { ArticlesComponent } from './template/template/articles/articles.component';
import { AddArticleComponent } from './template/template/articles/add-article/add-article.component';
import { EditArticleComponent } from './template/template/articles/edit-article/edit-article.component';
import { DetailsArticleComponent } from './template/template/articles/details-article/details-article.component';
import { AdminGuard } from './_guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
  { path: 'connexion', component: LoginComponent },
  { path: 'inscription', component: SignUpComponent },
   {
    path: "accueil",
    component: TemplateComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "",  canActivate: [AdminGuard], component: AccueilComponent },
      { path: "roles", canActivate: [AdminGuard], component: RolesComponent },
      { path: "articles", component: ArticlesComponent },
      { path: "articles/ajout", component: AddArticleComponent },
      { path: "articles/modification/:id", component: EditArticleComponent },
      { path: "articles/details/:id", component: DetailsArticleComponent },

    ]
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
