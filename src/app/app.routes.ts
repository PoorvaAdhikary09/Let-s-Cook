import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./Components/home/home.page').then((m) => m.HomePage),
  },
  {
    path:'explore-meals',
    loadComponent:()=> import('./Components/explore-meals/explore-meals.component').then ((m)=>m.ExploreMealsComponent),
  },
  {
    path:'catalog',
    loadComponent:()=> import('./Components/catalog-component/catalog-component.component').then((m)=>m.CatalogComponentComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

];
