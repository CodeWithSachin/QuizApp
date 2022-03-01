import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { QuestionComponent } from './Component/question/question.component';
import { RegisterComponent } from './Component/register/register.component';
import { WelcomeComponent } from './Component/welcome/welcome.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:"full"},
  {path:"welcome", component:WelcomeComponent},
  {path:"question", component:QuestionComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
