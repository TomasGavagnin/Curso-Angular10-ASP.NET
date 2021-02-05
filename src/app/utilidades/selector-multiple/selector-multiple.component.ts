import { Component, Input, OnInit } from '@angular/core';
import { MultipleSelectorModel } from './multipleSelectorModel';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css']
})
export class SelectorMultipleComponent implements OnInit {

  @Input() seleccionados: MultipleSelectorModel[] = []
  @Input() noSeleccionados: MultipleSelectorModel[] = []

  constructor() { }

  ngOnInit(): void {
  }

  deseleccionar(item: MultipleSelectorModel, index: number) {
    this.noSeleccionados.push(item)
    this.seleccionados.splice(index, 1)
  }

  seleccionar(item: MultipleSelectorModel, index: number) {
    this.seleccionados.push(item)
    this.noSeleccionados.splice(index, 1)
  }

  seleccionarTodo() {
    this.seleccionados.push(...this.noSeleccionados)
    this.noSeleccionados = []
  }

  deseleccionarTodo() {
    this.noSeleccionados.push(...this.seleccionados)
    this.seleccionados = []
  }
}
