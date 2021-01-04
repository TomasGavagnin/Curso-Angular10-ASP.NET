import { AbstractControl, ValidatorFn } from "@angular/forms";

export function primerlaLetraMayuscula(): ValidatorFn {
    return (control: AbstractControl) => {
        const valor = <string>control.value

        if (!valor || valor.length === 0) return primerlaLetraMayuscula
        
        const primeraLetra = valor[0]

        if (primeraLetra !== primeraLetra.toLocaleUpperCase()){
            return {
                primerlaLetraMayuscula: {
                    mensaje: 'La primera letra debe estar en mayuscula'
                }
            }
        } 
        
        return primerlaLetraMayuscula
    }
}