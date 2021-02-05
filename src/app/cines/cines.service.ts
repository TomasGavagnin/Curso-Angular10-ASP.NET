import { cineCreacionDTO, cineDTO } from './cine';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CinesService {

  private apiURL = environment.apiURL + 'cines'

  constructor(private http: HttpClient) { }

  public crear(cine: cineCreacionDTO) {
    return this.http.post(this.apiURL, cine)
  }

  public ObtenerTodos(pagina: number, cantidadRegistrosAMostrar: number): Observable<any> {

    let params = new HttpParams()
    params = params.append('pagina', pagina.toString())
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString())

    return this.http.get<cineDTO[]>(this.apiURL, { observe: 'response', params } )
  }

  public Borrar(Id: number) {
    return this.http.delete(`${this.apiURL}/${Id}`)
  }

  public ObtenerPorId(Id: number): Observable<cineDTO> {
    return this.http.get<cineDTO>(`${this.apiURL}/${Id}`)
  }

  public editar(Id: number, cine: cineCreacionDTO) {
    return this.http.put(`${this.apiURL}/${Id}`, cine)
  }
}
