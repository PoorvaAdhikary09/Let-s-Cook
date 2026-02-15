import { Component, OnInit, inject,CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { IonContent, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip, IonLabel,IonHeader } from "@ionic/angular/standalone";
import { register } from 'swiper/element/bundle';
import { addIcons } from 'ionicons';
import { restaurantOutline } from 'ionicons/icons';
import { MainService } from '../../Services/main-service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { BrowseType } from 'src/assets/Enum/browse.enum';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
register()

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonContent, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip, IonLabel, RouterLink,HeaderComponent,FooterComponent,IonHeader],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit, AfterViewInit{

  @ViewChild('swiperRef', { static: false }) swiperRef!: ElementRef;
  private readonly mealService = inject(MainService)
  private readonly router = inject(Router);
  private readonly browseType = BrowseType;

  heroSlides = [
    {
      image: 'assets/images/hero-food1.jpg',
      title: 'Savor the Flavors',
      subtitle: 'Indulge in gourmet recipes crafted for you',
    },
    {
      image: 'assets/images/hero-food2.jpg',
      title: 'Cook Like a Pro',
      subtitle: 'Step-by-step guides to culinary masterpieces',
    },
    {
      image: 'assets/images/hero-food3.jpg',
      title: 'Fresh Ingredients, Bold Tastes',
      subtitle: 'Discover healthy and delicious meals',
    },
  ];
  category="Explore Categories"
  categories:any=[]
  randomMeal:any
  isLoading:boolean=true

  constructor(){
    addIcons({restaurantOutline})
  }
  
  ngOnInit(): void {
  forkJoin({
  categories: this.mealService.getAllCaterogy(),
  randomMeal: this.mealService.getOneRandomMeal()
}).subscribe({
  next: ({ categories, randomMeal }: any) => {
    this.categories = categories.categories;
    this.randomMeal = randomMeal.meals;
    this.isLoading=false
  },
  error: err => console.error(err)
});
}

ngAfterViewInit(){
  const swiperEl= this.swiperRef.nativeElement;

Object.assign(swiperEl,{
  breakpoints: {
    320:{
      slidesPerView:1,
      spaceBetween:10,
    },
    768:{
      slidesPerView:3,
      spaceBetween:10,
    },
    1024:{
      slidesPerView:5,
      spaceBetween:10,
    },
    1600:{
      slidesPerView:5,
      spaceBetween:10,
    },
  },
})
swiperEl.initialize();
}

  getAllCategories(){
    const querparams={pageName:BrowseType.CATEGORIES}
    this.router.navigate(['/catalog'],{queryParams:querparams})
  }

  getDetailsOfRandomMeal(mealId:any){
    const querparams={mealId:mealId}
    this.router.navigate(['/mealDetails'],{queryParams:querparams})
  }

  getMealsByCategory(categoryName:any){
    const querparams={pageName:BrowseType.CATEGORY,categoryName:categoryName}
    this.router.navigate(['/catalog'],{queryParams:querparams})
  }
}
