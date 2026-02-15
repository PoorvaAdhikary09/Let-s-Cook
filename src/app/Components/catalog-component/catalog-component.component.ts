import { Component, inject, OnInit } from '@angular/core';
import { IonContent, IonCard, IonSearchbar, IonHeader } from '@ionic/angular/standalone';
import { MainService } from 'src/app/Services/main-service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowseType } from 'src/assets/Enum/browse.enum';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-catalog-component',
  templateUrl: './catalog-component.component.html',
  styleUrls: ['./catalog-component.component.scss'],
  imports: [IonContent, IonCard, IonSearchbar, FormsModule, IonHeader, HeaderComponent, FooterComponent],
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
  isLoading: boolean = true;

  constructor() {}

  ngOnInit() {
  this.activatedRoute.queryParams.subscribe(params => {
    this.resetState();

    switch (params['pageName']) {

      case BrowseType.CATEGORIES:
        this.loadCategories();
        break;

      case BrowseType.INGREDIENTS:
        this.loadIngredients();
        break;

      case BrowseType.LETTER:
        this.loadMealsByLetter(params['letter']);
        break;

      case BrowseType.FOODTYPE:
        this.loadMealsByArea(params['foodType']);
        break;

      case BrowseType.CATEGORY:
        this.loadMealsByCategory(params['categoryName']);
        break;

      case BrowseType.INGREDIENT:
        this.loadMealsByIngredient(params['ingredientName']);
        break;

      case BrowseType.MEAL:
        this.loadMealsByName(params['mealName']);
        break;
    }
  })
}

resetState() {
  this.categories = [];
  this.ingredients = [];
  this.meals = [];
}

loadCategories() {
  this.mainService.getAllCaterogy().subscribe({next:(res:any) => {
    const categories=res.categories || [];
    this.categories = categories.map((cat: any) => ({
      ...cat,
      strCategoryThumb: `https://www.themealdb.com/images/category/${cat.strCategory}.png`
    }));
    this.isLoading=false
  }
 });
}

loadIngredients() {
  this.mainService.getAllIngredients().subscribe({next:(res:any) => {
    const allIngredients = res.meals || [];
    this.ingredients = allIngredients.map((ing: any) => ({
      ...ing,
      strThumb: `https://www.themealdb.com/images/ingredients/${ing.strIngredient}.png`
    }));
    this.isLoading=false
  }
  });
}

loadMealsByLetter(letter:string) {
  this.mainService.filterByFirstLetter(letter).subscribe({next:(res:any) => {
    this.meals = res.meals || [];
    this.isLoading=false
  }
  });
}

loadMealsByArea(area:string) {
  this.mainService.filterByArea(area).subscribe({next:(res:any) => {
    this.meals = res.meals || [];
    this.isLoading=false
  }
  }); 
 }

loadMealsByCategory(categoryName:string) {
  this.resetState();
  this.mainService.filterByCategory(categoryName).subscribe({next:(res:any) => {
    this.meals = res.meals || [];
    this.isLoading=false
  }
  }); 
}

loadMealsByIngredient(ingredientName:string) {
  this.resetState();
  this.mainService.filterByIngredient(ingredientName).subscribe({next:(res:any) => {
    this.meals = res.meals || [];
    this.isLoading=false
  }
  }); 
}

loadMealsByName(mealName:string) {
  this.resetState();
  this.mainService.searchMealByName(mealName).subscribe({next:(res:any) => {
    this.meals = res.meals || [];
    this.isLoading=false
  }
  }); 
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

  getCategoryMeals(categoryName:string){
    const queryparams={pageName:BrowseType.CATEGORY, categoryName}
    this.router.navigate(['/catalog'],{queryParams:queryparams})
    this.isLoading=true
    this.loadMealsByCategory(categoryName)
  } 

  getIngredientMeal(ingredientName:string){
    const queryparams={pageName:BrowseType.INGREDIENT, ingredientName}
    this.router.navigate(['/catalog'],{queryParams:queryparams})
    this.isLoading=true
    this.loadMealsByIngredient(ingredientName)
  }

  getDetailsMeal(mealId:any){
    const querparams={mealId:mealId}
    this.router.navigate(['/mealDetails'],{queryParams:querparams})
  }
  }
