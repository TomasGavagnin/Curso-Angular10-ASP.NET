import { GenerosService } from './../generos.service';
import { Component, OnInit } from '@angular/core';
import { generoDTO } from '../genero';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit {

  generos: generoDTO[]
  columnasAMostrar = [ 'id', 'nombre', 'acciones' ]
  cantidadTotalRegistros
  paginaActual = 1
  cantidadRegistrosAMostrar = 10

  constructor(private generosService: GenerosService) { }

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar)
  }

  cargarRegistros(pagina: number, cantidadRegistrosAMostrar: number) {
    this.generosService.ObtenerTodos(pagina, cantidadRegistrosAMostrar)
    .subscribe((respuesta: HttpResponse<generoDTO[]>) => {
      this.generos = respuesta.body
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros")
    }, error => console.log(error))
  }

  ActualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1
    this.cantidadRegistrosAMostrar = datos.pageSize

    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar)
  }

  Borrar(Id: number) {
    this.generosService.Borrar(Id)
    .subscribe(() => {
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar)
    }, error => console.error(error))
  }
}
