import { Component, inject, OnInit } from '@angular/core';
import { IonContent, IonSearchbar, IonIcon, IonCard, IonChip, IonButton, IonButtons, IonToolbar } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { fastFoodOutline, nutritionOutline } from 'ionicons/icons';
import { forkJoin } from 'rxjs';
import { MainService } from 'src/app/Services/main-service';
import countryData from '../../../assets/data/country.json'

@Component({
  selector: 'app-explore-meals',
  templateUrl: './explore-meals.component.html',
  styleUrls: ['./explore-meals.component.scss'],
  imports: [IonContent, IonSearchbar, IonIcon, IonCard, IonChip, IonButton, IonButtons, IonToolbar],
})
export class ExploreMealsComponent  implements OnInit {
  private readonly mainService= inject  (MainService)
  ingredients: any=[]
  meals: any=[]
  categories:any=[]
  countries=countryData

  constructor() {
    addIcons({fastFoodOutline,nutritionOutline})
   }

  ngOnInit() {
    forkJoin({
      ingredients : this.mainService.getAllIngredients(),
      categories : this.mainService.getAllCaterogy(),
      meals : this.mainService.filterByCategory('Miscellaneous')
    }).subscribe({
      next:({ingredients, categories, meals}:any)=>{
       this.ingredients = ingredients
       this.ingredients = this.ingredients.meals.slice(0, 6)
       this.categories = categories.categories.slice(0,6)
       this.meals = meals.meals.slice(0,6)
       console.log(this.meals)
      }
    })
  }

  alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  getAllCategories(){

  }
  getAllIngredients(){

  }
}
