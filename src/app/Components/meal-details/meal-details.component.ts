import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonChip, IonButton, IonSkeletonText, IonHeader } from "@ionic/angular/standalone";
import { MainService } from 'src/app/Services/main-service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
  imports: [IonContent, IonChip, IonButton, IonHeader, HeaderComponent, FooterComponent],
})
export class MealDetailsComponent  implements OnInit {
  private mainService = inject(MainService)
  private activatedRoute = inject(ActivatedRoute)
  meal:any=[];
  showRecipe = false;
  ingredients: { ingredientImg: string; ingredient: string; measure: string }[] = [];
  isLoading:boolean=true

  constructor() { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params=>{
      const mealId = params['mealId']
      this.mainService.getMealDetailsById(mealId).subscribe((mealDetails:any) => {
          this.meal = mealDetails.meals[0];
          this.ingredients = []; // Clear previous ingredients if any
          
          for (let i = 1; i <= 20; i++) {
            const ingredient = this.meal[`strIngredient${i}`];
            const measure = this.meal[`strMeasure${i}`];
            
            if (ingredient && ingredient.trim() !== "") {
              const ingredientImg = `https://www.themealdb.com/images/ingredients/${ingredient}.png`;
              this.ingredients.push({ingredientImg, ingredient, measure});
            }
          }
          this.isLoading=false;
      });
    })
  }

toggleRecipe() {
  this.showRecipe = !this.showRecipe;
}
}
