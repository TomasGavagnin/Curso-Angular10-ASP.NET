import { ActoresService } from './../actores.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { actorPeliculaDTO } from '../actor';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {

  control: FormControl = new FormControl()

  @Input() actoresSeleccionados: actorPeliculaDTO[] = []

  actoresAMosttrar: actorPeliculaDTO[] = []

  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones']

  constructor(private actoresServices: ActoresService) { }

  @ViewChild(MatTable) table: MatTable<any>

  ngOnInit(): void {
    this.control.valueChanges.subscribe(nombre => {
      this.actoresServices.obtenerPorNombre(nombre).subscribe(actores => {
        this.actoresAMosttrar = actores
      })
    })
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    if (this.actoresSeleccionados.filter(v => v.nombre === event.option.value.nombre).length === 0) {
      this.actoresSeleccionados.push(event.option.value)
      this.control.patchValue('')
    }

    if (this.table !== undefined) {
      this.table.renderRows()
    }
  }

  eliminar(actor) {
    const indice = this.actoresSeleccionados.findIndex(a => a.nombre === actor.nombre)
    this.actoresSeleccionados.splice(indice, 1)
    this.table.renderRows()
  }

  finalizaArrastre(event: CdkDragDrop<any[]>) {
    const indicePrevio = this.actoresSeleccionados.findIndex(
      actor => actor === event.item.data
    )

    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex)
    this.table.renderRows()
  }
}
