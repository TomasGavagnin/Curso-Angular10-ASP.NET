import { ActoresService } from './../actores.service';
import { Component, OnInit } from '@angular/core';
import { actorDTO } from '../actor';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.css']
})
export class IndiceActoresComponent implements OnInit {

  actores: actorDTO[]
  columnasAMostrar = [ 'id', 'nombre', 'acciones' ]
  cantidadTotalRegistros
  paginaActual = 1
  cantidadRegistrosAMostrar = 10

  constructor(private actoresService: ActoresService) { }

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar)
  }

  cargarRegistros(pagina: number, cantidadRegistrosAMostrar: number) {
    this.actoresService.ObtenerTodos(pagina, cantidadRegistrosAMostrar)
    .subscribe((respuesta: HttpResponse<actorDTO[]>) => {
      this.actores = respuesta.body
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros")
    }, error => console.log(error))
  }

  ActualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1
    this.cantidadRegistrosAMostrar = datos.pageSize

    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar)
  }

  Borrar(Id: number) {
    this.actoresService.Borrar(Id)
    .subscribe(() => {
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar)
    }, error => console.error(error))
  }

}
