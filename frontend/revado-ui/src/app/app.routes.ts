import { Routes,Router } from '@angular/router';
import { inject } from '@angular/core';
import { Home } from './pages/home/home';
import { LoginComponent } from './pages/components/login/login';
import { Register } from './pages/components/register/register';
import { AuthService } from './pages/services/auth';  


export const routes: Routes = [
      {path:'login', component: LoginComponent  },   
      {path:'register', component: Register},
      
      { path: 'home', component: Home,canActivate: [() => inject(AuthService).isLoggedIn() ? true : inject(Router).createUrlTree(['/login'])]   },
      {
            /*this will redirect LOGIN page **/
       path:'',redirectTo:'login', pathMatch:'full'
      }
];
