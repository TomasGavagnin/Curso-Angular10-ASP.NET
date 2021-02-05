import { GenerosService } from './../generos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { generoCreacionDTO, generoDTO } from '../genero';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {

  constructor(private router: Router, private GenerosService: GenerosService, private activetedroute: ActivatedRoute) { }

  modelo: generoDTO
  errores: string[] = []

  ngOnInit(): void {
    this.activetedroute.params.subscribe(params => {
      this.GenerosService.ObtenerPorId(params.id)
      .subscribe(genero => {
        this.modelo = genero
      }, () => this.router.navigate(['/generos']))
    })
  }

  guardarCambios(genero: generoCreacionDTO): void {

    this.GenerosService.editar(this.modelo.id, genero)
    .subscribe(() => {
      this.router.navigate(['/generos'])
    }, error => this.errores = parsearErroresAPI(error))
  }

}
