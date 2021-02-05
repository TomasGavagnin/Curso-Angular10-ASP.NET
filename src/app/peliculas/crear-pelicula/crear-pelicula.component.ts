import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { MultipleSelectorModel } from './../../utilidades/selector-multiple/multipleSelectorModel';
import { PeliculasService } from './../peliculas.service';
import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDTO } from '../pelicula';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {

  constructor(private peliculasService: PeliculasService) { }

  generosNoSeleccionados: MultipleSelectorModel[]
  cinesNoSeleccionados: MultipleSelectorModel[]
  errores: string[] = []

  ngOnInit(): void {

    this.peliculasService.postGet()
    .subscribe(resultado => {
      this.generosNoSeleccionados = resultado.generos.map(generos => {
        return <MultipleSelectorModel>{ llave: generos.id, valor: generos.nombre }
      })

      this.cinesNoSeleccionados = resultado.cines.map(cines => {
        return <MultipleSelectorModel>{ llave: cines.id, valor: cines.nombre }
      })
    }, error => console.error(error))
  }

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    this.peliculasService.crear(pelicula)
    .subscribe(() => console.log('exitoso'),
    error => this.errores = parsearErroresAPI(error))
  }
}
