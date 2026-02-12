import { Component, inject, OnInit } from '@angular/core';
import { IonContent, IonCard, IonSearchbar } from '@ionic/angular/standalone';
import { MainService } from 'src/app/Services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowseType } from 'src/assets/Enum/browse.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalog-component',
  templateUrl: './catalog-component.component.html',
  styleUrls: ['./catalog-component.component.scss'],
  imports: [IonContent, IonCard, IonSearchbar, FormsModule],
})
export class CatalogComponentComponent implements OnInit {
  private readonly mainService = inject(MainService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  categories: any = [];
  ingredients: any = [];
  meals: any = [];
  searchTerm: string = '';
  letter: string = '';

  constructor() {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      //activatedRoute with subscribe to get the query params from the url and check if the pageName is equal to categories or ingredients and call the respective service method to get the data and store it in the respective variable
      if (params['pageName'] === BrowseType.CATEGORIES) {
        this.mainService.getAllCaterogy().subscribe({
          next: (res: any) => {
            this.categories = res.categories;
          },
        });
      }
      if (params['pageName'] === BrowseType.INGREDIENTS) {
        this.mainService.getAllIngredients().subscribe({
          next: (res: any) => {
            const meals = res.meals || [];
            this.ingredients = meals.map((ing: any) => ({
              ...ing,
              strThumb: `https://www.themealdb.com/images/ingredients/${ing.strIngredient}.png`
            }));
          },
        });
      }
    });
    if (
      this.activatedRoute.snapshot.queryParams['pageName'] === BrowseType.LETTER
    ) {
      this.letter = this.activatedRoute.snapshot.queryParams['letter'];
      this.mainService.filterByFirstLetter(this.letter).subscribe({
        next: (res: any) => {
          this.meals = res.meals;
        },
      });
    }

    if(this.activatedRoute.snapshot.queryParams['pageName']===BrowseType.FOODTYPE){
      const foodType = this.activatedRoute.snapshot.queryParams['foodType'];
      this.mainService.filterByArea(foodType).subscribe({
        next: (res: any) => {
          this.meals = res.meals;
        },
      });
    }
  }

  get filteredCategories() {
    return this.categories.filter((category: any) =>
      category.strCategory
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase()),
    );
  }

  get filteredIngredients() {
    return this.ingredients.filter((ingredient: any) =>
      ingredient.strIngredient
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase()),
    );
  }

  get filteredMeals() {
    return this.meals.filter((meal: any) =>
      meal.strMeal.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }
  getDetailsMeal(mealId:any){
    const querparams={mealId:mealId}
    this.router.navigate(['/mealDetails'],{queryParams:querparams})
  }
  }
