import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  form: FormGroup
  @Output() OnSubmit: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>()
  @Input() modelo: actorDTO
  @Input() errores: string[] = []

  imagenCambiada = false

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', { validators: [Validators.required] }],
      fechaNacimiento: '',
      foto: '',
      biografia: ''
    })

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo)
    }
  }

  archivoSeleccionado(file: File) {
    this.imagenCambiada = true
    this.form.get('foto').setValue(file)
  }

  cambioMarkdown(texto: string): void {
    this.form.get('biografia').setValue(texto)
  }

  onSubmit(): void {

    if (!this.imagenCambiada) {
      this.form.patchValue({ 'foto': null})
    }

    this.OnSubmit.emit(this.form.value)
  }
}
