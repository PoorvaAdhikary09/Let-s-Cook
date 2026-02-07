import { Component, inject, OnInit } from '@angular/core';
import { IonContent, IonCard, IonSearchbar } from "@ionic/angular/standalone";
import { MainService } from 'src/app/Services/main-service';
import { ActivatedRoute } from '@angular/router';
import { BrowseType } from 'src/assets/Enum/browse.enum';

@Component({
  selector: 'app-catalog-component',
  templateUrl: './catalog-component.component.html',
  styleUrls: ['./catalog-component.component.scss'],
  imports: [IonContent, IonCard, IonSearchbar],
})
export class CatalogComponentComponent  implements OnInit {
  private readonly mainService = inject(MainService);
  private readonly activatedRoute = inject(ActivatedRoute)

  categories:any=[]
  ingredients:any=[]

  constructor() { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(params['pageName']=== BrowseType.CATEGORIES){
        this.mainService.getAllCaterogy().subscribe({
          next:(res:any)=>{
            this.categories = res.categories
            console.log(res.categories)
          }
        })            
      }    
      else if(params['pageName']=== BrowseType.INGREDIENTS){
        this.mainService.getAllIngredients().subscribe({
          next:(res:any)=>{
            this.ingredients = res.meals
            console.log(res.meals)
          }
       })
     }
   })
 }
}
