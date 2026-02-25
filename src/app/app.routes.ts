import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'signup',
    loadComponent: () => import('./Components/Auth/signup-form/signup-form.component').then((m) => m.SignupFormComponent),
  },
  {
    path: '',
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
    path:'mealDetails',
    loadComponent:()=> import('./Components/meal-details/meal-details.component').then((m)=>m.MealDetailsComponent),
  },
];
