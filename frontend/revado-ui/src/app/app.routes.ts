import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/components/login/login';
import { Register } from './pages/components/register/register';


export const routes: Routes = [
      {path:'login', component: Login},   
      {path:'register', component: Register},
      
      { path: 'home', component: Home   },
      {
            path:'',redirectTo:'home', pathMatch:'full'
      }
];
