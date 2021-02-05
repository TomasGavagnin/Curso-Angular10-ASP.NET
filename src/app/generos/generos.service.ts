import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { generoDTO, generoCreacionDTO } from './genero';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  private apiURL = environment.apiURL + 'generos'

  constructor(private http: HttpClient) { }

  public ObtenerTodos(pagina: number, cantidadRegistrosAMostrar: number): Observable<any> {

    let params = new HttpParams()
    params = params.append('pagina', pagina.toString())
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString())

    return this.http.get<generoDTO[]>(this.apiURL, { observe: 'response', params } )
  }

  public ObtenerPorId(Id: number): Observable<generoDTO> {
    return this.http.get<generoDTO>(`${this.apiURL}/${Id}`)
  }

  public crear(genero: generoCreacionDTO) {
    return this.http.post(this.apiURL, genero)
  }

  public editar(Id: number, genero: generoCreacionDTO) {
    return this.http.put(`${this.apiURL}/${Id}`, genero)
  }

  public Borrar(Id: number) {
    return this.http.delete(`${this.apiURL}/${Id}`)
  }
}
