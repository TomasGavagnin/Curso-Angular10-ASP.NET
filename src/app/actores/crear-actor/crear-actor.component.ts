import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { Router } from '@angular/router';
import { ActoresService } from './../actores.service';
import { Component, OnInit } from '@angular/core';
import { actorCreacionDTO } from '../actor';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css']
})
export class CrearActorComponent implements OnInit {

  constructor(private actoresService: ActoresService, private router: Router) { }

  errores = []

  ngOnInit(): void {
  }

  guardarCambios(actor: actorCreacionDTO) {
    this.actoresService.Crear(actor)
    .subscribe(() => {
      this.router.navigate(['/actores'])
    }, errores => this.errores = parsearErroresAPI(errores))
  }
}
