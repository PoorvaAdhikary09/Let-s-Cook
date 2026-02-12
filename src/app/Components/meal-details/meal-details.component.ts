import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonChip, IonButton, IonSkeletonText } from "@ionic/angular/standalone";
import { forkJoin } from 'rxjs';
import { MainService } from 'src/app/Services/main-service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
  imports: [IonContent, IonChip, IonButton, IonSkeletonText],
})
export class MealDetailsComponent  implements OnInit {
  private mainService = inject(MainService)
  private activatedRoute = inject(ActivatedRoute)
  meal:any=[];
  showRecipe = false;
  allIngredients: any = [];
  ingredients: { ingredientImg: string; ingredient: string; measure: string }[] = [];

  constructor() { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params=>{
      const mealId = params['mealId']
      forkJoin({ 
        mealDetails: this.mainService.getMealDetailsById(mealId),
        ingredients: this.mainService.getAllIngredients()
       }).subscribe(({
        next: ({mealDetails, ingredients}:any) => {
          this.meal = mealDetails;
          this.allIngredients = ingredients;
          this.meal = this.meal.meals[0];
          console.log('Meal details fetched successfully:', this.allIngredients.meals);
          for (let i = 1; i <= 20; i++) {
            const ingredient = this.meal[`strIngredient${i}`];
            const measure = this.meal[`strMeasure${i}`];
            const ingredientImg = this.allIngredients.meals.find((ing: any) => ing.strIngredient === ingredient)?.strThumb;
            if (ingredient && measure) {
              this.ingredients.push({ingredientImg, ingredient, measure});
            }
          }
          console.log(this.ingredients)
        }
       }))
      })
    }

toggleRecipe() {
  this.showRecipe = !this.showRecipe;
}
}
