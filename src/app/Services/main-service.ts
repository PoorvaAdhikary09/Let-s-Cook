import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainService {
   public baseUrl = 'https://www.themealdb.com/api/json/v1/1/';

   constructor(private http: HttpClient){}

   getAllCaterogy(){
    return this.http.get(this.baseUrl+'categories.php');
   }

   getOneRandomMeal() {
    return this.http.get(this.baseUrl + 'random.php');
  }

  getAllIngredients(){
    return this.http.get(this.baseUrl+'list.php?i=list')
  }

  filterByCategory(categoryName:string){
    return this.http.get(this.baseUrl+'filter.php?c='+categoryName)
  }

  filterByIngredient(ingredientName:string){
    return this.http.get(this.baseUrl+'filter.php?i='+ingredientName)
  }

  filterByFirstLetter(letter:string){
    return this.http.get(this.baseUrl+'search.php?f='+letter)
  }

  filterByArea(area:string){
    return this.http.get(this.baseUrl+'filter.php?a='+area)
  }

  searchMealByName(mealName:string){
    return this.http.get(this.baseUrl+'search.php?s='+mealName)
  }

  getMealDetailsById(mealId:string){
    return this.http.get(this.baseUrl+'lookup.php?i='+mealId)
  }
}
