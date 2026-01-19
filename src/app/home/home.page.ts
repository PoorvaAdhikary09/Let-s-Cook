import { Component, AfterViewInit, OnInit, inject } from '@angular/core';
import { HeaderComponent } from "../Components/header/header.component";
import { FooterComponent } from "../Components/footer/footer.component";
import { IonContent, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip, IonLabel } from "@ionic/angular/standalone";

import Swiper from 'swiper';

import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { addIcons } from 'ionicons';
import { restaurantOutline } from 'ionicons/icons';
import { MainService } from '../Services/main-service';
import { forkJoin } from 'rxjs';
Swiper.use([Autoplay, Pagination, EffectFade]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [HeaderComponent, FooterComponent, IonContent, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip, IonLabel],
})
export class HomePage implements OnInit, AfterViewInit {

  private readonly mealService = inject(MainService)

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

  categories:any=[]
  randomMeal:any

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
    console.log(this.randomMeal)
    
  },
  error: err => console.error(err)
});
}

   ngAfterViewInit(): void {
    new Swiper('.hero-swiper', {
      modules: [Autoplay, Pagination, EffectFade],
      loop: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
    this.initializeSwiper();
  }

  initializeSwiper(){
    new Swiper('.categories-swiper', {
      slidesPerView: 1, // Default for mobile
      spaceBetween: 16,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
      breakpoints: {
        768: {
          slidesPerView: 3, // Tablet
        },
        1024: {
          slidesPerView: 4, // Desktop
        },
        1200: {
          slidesPerView: 5, // Large screens
        },
      },
    });
  }

  getRecipes(){
    alert("all recipes fetching")
  }

  getAllCategories(){
    alert('all categories fetching')
  }

  getDetailsOfRandomMeal(mealId:any){
    console.log("Meal Id: ", mealId)
  }
}
