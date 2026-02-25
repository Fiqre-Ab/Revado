import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginComponent } from './pages/components/login/login';
import { Register } from './pages/components/register/register';


export const routes: Routes = [
      {path:'login', component: LoginComponent  },   
      {path:'register', component: Register},
      
      { path: 'home', component: Home   },
      {
            /*this will redirect home page **/
       path:'',redirectTo:'home', pathMatch:'full'
      }
];
