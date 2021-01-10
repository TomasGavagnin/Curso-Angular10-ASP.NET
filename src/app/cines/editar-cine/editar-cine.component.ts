import { Component, OnInit } from '@angular/core';
import { cineCreacionDTO, cineDTO } from '../cine';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  modelo: cineDTO = { nombre: 'Sambil', latitud: 18.482849960148176, longitud: -69.93999481201173 }

  constructor() { }

  ngOnInit(): void {
  }

  guardarCambios(cine: cineCreacionDTO) {
    
  }
}
