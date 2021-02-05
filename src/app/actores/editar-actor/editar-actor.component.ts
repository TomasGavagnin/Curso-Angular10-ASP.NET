import { ActoresService } from './../actores.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorCreacionDTO, actorDTO } from '../actor';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  constructor(private router: Router, private actorService: ActoresService, private activetedroute: ActivatedRoute) { }

  modelo: actorDTO
  errores: string[] = []

  ngOnInit(): void {
    this.activetedroute.params.subscribe(params => {
      this.actorService.ObtenerPorId(params.id)
      .subscribe(genero => {
        this.modelo = genero
      }, () => this.router.navigate(['/generos']))
    })
  }

  guardarCambios(actor: actorCreacionDTO): void {

    this.actorService.Editar(this.modelo.id, actor)
    .subscribe(() => {
      this.router.navigate(['/actores'])
    }, error => this.errores = parsearErroresAPI(error))
  }
}
