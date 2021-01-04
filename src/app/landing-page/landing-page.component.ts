import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  peliculasEnCines: any
  peliculasProximosEstrenos: any

  ngOnInit(): void {

    this.peliculasEnCines = [{
      titulo: 'Spider-man',
      fechaLanzamiento: new Date(),
      precio: 1400.99,
      poster: 'https://cnet1.cbsistatic.com/img/rfzZ-7G32v_qEt2uCD0b4KB2rho=/940x0/2019/03/26/13d0a566-7355-4381-be24-dee281227504/spider-man-far-from-home-promo-image-1.jpg'
    }, 
    {
      titulo: 'Moana',
      fechaLanzamiento: new Date('2016-11-11'),
      precio: 300.99,
      poster: 'https://thaniaperea.com/wp-content/uploads/2019/04/Mohana.png'
    }]
  }

}
