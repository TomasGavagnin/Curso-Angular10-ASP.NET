import { actorPeliculaDTO } from './../../actores/actor';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/multipleSelectorModel';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {

  form: FormGroup

  @Input() modelo: PeliculaDTO
  @Output() OnSubmit: EventEmitter<PeliculaCreacionDTO> = new EventEmitter<PeliculaCreacionDTO>()

  @Input() generosNoSeleccionados: MultipleSelectorModel[] 

  generosSeleccionados: MultipleSelectorModel[] = []

  @Input() cinesNoSeleccionados: MultipleSelectorModel[]
  @Input() actoresSeleccionados: actorPeliculaDTO[] = []
  @Input() errores: string[] = []

  cinesSeleccionados: MultipleSelectorModel[] = []

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: [
        '',
        {
          validators: [Validators.required]
        }
      ],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosIds: '',
      cinesIds: '',
      actores: ''
    })

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo)
    }
  }

  archivoSeleccionado(archivo: File) {
    this.form.get('poster').setValue(archivo)
  }

  changeMarkdown(texto) {
    this.form.get('resumen').setValue(texto)
  }

  guardarCambios() {
    const generosId = this.generosSeleccionados.map(val => val.llave)
    this.form.get('generosIds').setValue(generosId)

    const cinesId = this.cinesSeleccionados.map(val => val.llave)
    this.form.get('cinesIds').setValue(cinesId)

    const actores = this.actoresSeleccionados.map(val => {
      return { id: val.id, personaje: val.personaje }
    })

    this.form.get('actores').setValue(actores)

    this.OnSubmit.emit(this.form.value)
  }
}
