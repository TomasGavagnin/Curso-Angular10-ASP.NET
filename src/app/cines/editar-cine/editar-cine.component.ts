import { CinesService } from './../cines.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO, cineDTO } from '../cine';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor(private router: Router, private cinesService: CinesService, private activetedroute: ActivatedRoute) { }

  modelo: cineDTO
  errores: string[] = []

  ngOnInit(): void {
    this.activetedroute.params.subscribe(params => {
      this.cinesService.ObtenerPorId(params.id)
      .subscribe(genero => {
        this.modelo = genero
      }, () => this.router.navigate(['/cines']))
    })
  }

  guardarCambios(cine: cineCreacionDTO): void {

    this.cinesService.editar(this.modelo.id, cine)
    .subscribe(() => {
      this.router.navigate(['/cines'])
    }, error => this.errores = parsearErroresAPI(error))
  }
}
