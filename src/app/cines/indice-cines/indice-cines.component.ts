import { CinesService } from './../cines.service';
import { cineDTO } from './../cine';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrls: ['./indice-cines.component.css']
})
export class IndiceCinesComponent implements OnInit {

  cines: cineDTO[]
  columnasAMostrar = [ 'id', 'nombre', 'acciones' ]
  cantidadTotalRegistros
  paginaActual = 1
  cantidadRegistrosAMostrar = 10

  constructor(private cinesService: CinesService) { }

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar)
  }

  cargarRegistros(pagina: number, cantidadRegistrosAMostrar: number) {
    this.cinesService.ObtenerTodos(pagina, cantidadRegistrosAMostrar)
    .subscribe((respuesta: HttpResponse<cineDTO[]>) => {
      this.cines = respuesta.body
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros")
    }, error => console.log(error))
  }

  ActualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1
    this.cantidadRegistrosAMostrar = datos.pageSize

    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar)
  }

  Borrar(Id: number) {
    this.cinesService.Borrar(Id)
    .subscribe(() => {
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar)
    }, error => console.error(error))
  }

}
