import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/Services/main-service';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-scratch-card',
  templateUrl: './scratch-card.component.html',
  styleUrls: ['./scratch-card.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip, IonButton],
})
export class ScratchCardComponent  implements OnInit,AfterViewInit {
  private readonly mealService = inject(MainService)

  //variables
  @ViewChild('scratchCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!:CanvasRenderingContext2D;
  private isScratching=false;
  randomMeal:any
  private canvasReady = false;



  constructor() { }

  ngOnInit(){
    this.mealService.getOneRandomMeal().subscribe({
      next:(res:any)=>{
        this.randomMeal=res.meals;
        console.log(this.randomMeal)
      }  
    });
  }

  ngAfterViewInit(){
    const canvas=this.canvasRef.nativeElement;
    if(!canvas) return;

    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;

    this.ctx=ctx;
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.fillStyle='#B0B0B0';
    this.ctx.fillRect(0,0,canvas.width,canvas.height);
    this.ctx.globalCompositeOperation='destination-out';

    this.canvasReady = true;
  }

  startScratch(event:MouseEvent|TouchEvent){
    this.isScratching=true;
    this.scratch(event)
  }

  stopScratch(){
    this.isScratching=false;
  }

  scratch(event:any){
   event.preventDefault(); 
   if (!this.canvasReady || !this.ctx) return; 
   if(!this.isScratching) return;

   const rect=this.canvasRef.nativeElement.getBoundingClientRect();
   const x = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
   const y = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top;
  
    this.ctx.beginPath();
    this.ctx.arc(x, y, 15, 0, Math.PI * 2);
    this.ctx.fill();

    this.checkReveal()
  }

  checkReveal() {
  const canvas = this.canvasRef.nativeElement;
  const pixels = this.ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  let transparent = 0;
  const total = pixels.length / 4;

  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] === 0) transparent++;
  }

  if (transparent / total > 0.55) {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}


   getDetailsOfRandomMeal(mealId:any){
    console.log("Meal Id: ", mealId)
  }

}
