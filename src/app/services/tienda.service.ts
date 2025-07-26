import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Videojuegos} from '../Models/Videojuegos';
import { appsettings } from '../Settings/appsettings';
import { ResponseAPI } from '../Models/ResponseAPI';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  private http = inject(HttpClient); //inyectamos el servicio del cliente

  private apiUrl:string =appsettings.apiUrl + "/videojuegos";

constructor(){
  this.listar();
}

  listar(): Observable<ResponseAPI<Videojuegos[]>> {
    return this.http.get<ResponseAPI<Videojuegos[]>>(this.apiUrl);
  }

 obtener(id: number): Observable<ResponseAPI<Videojuegos>> {
    return this.http.get<ResponseAPI<Videojuegos>>(`${this.apiUrl}/${id}`);
  }
  

 crear(objeto: Videojuegos): Observable<ResponseAPI<Videojuegos>> {
    return this.http.post<ResponseAPI<Videojuegos>>(this.apiUrl, objeto);
  }

 editar(objeto: Videojuegos): Observable<ResponseAPI<Videojuegos>> {
    return this.http.put<ResponseAPI<Videojuegos>>(`${this.apiUrl}/${objeto.idVideojuego}`, objeto);
  }

  borrar(id:number): Observable<any>{
    return this.http.delete<ResponseAPI<any>>(`${this.apiUrl}/${id}`);  }
}
