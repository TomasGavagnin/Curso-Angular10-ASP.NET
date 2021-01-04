import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primerlaLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { generoCreacionDTO } from '../genero';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.css']
})
export class FormularioGeneroComponent implements OnInit {

  form: FormGroup;
  @Output() submit: EventEmitter<generoCreacionDTO> = new EventEmitter<generoCreacionDTO>()

  @Input() modelo: generoCreacionDTO

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nombre: ['', {
        validators: [Validators.required, Validators.minLength(3), primerlaLetraMayuscula()]
      }]
    })

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo)
    }
  }

  guardarCambios() {
    this.submit.emit(this.form.value)
  }

  obtenerErrorCampoNombre(): string {

    var campo = this.form.get('nombre')

    if (campo.hasError('required')) {
      return 'El campo nombre es requerido'
    }
    else if (campo.hasError('minlength')){
      return 'El campo nombre es de minimo tres caracteres'
    }
    else if (campo.hasError('primerlaLetraMayuscula')){
      return campo.getError('primerlaLetraMayuscula').mensaje
    }

    return ''
  }

}
