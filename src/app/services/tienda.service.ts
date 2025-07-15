import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Videojuegos} from '../Models/Videojuegos';
import { appsettings } from '../Settings/appsettings';
import { ResponseAPI } from '../Models/ResponseAPI';


@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  private http = inject(HttpClient); //inyectamos el servicio del cliente

  private apiUrl:string =appsettings.apiUrl + "/videojuegos"

constructor(){
  this.listar();
}
obtener(id:number){
  return this.http.get<Videojuegos[]>(`${this.apiUrl}${id}`);
}
  listar() {
  return this.http.get('/api/videojuegos'); // ✅ sin dominio, usa proxy
}


  crear(juego: Videojuegos) {
    return this.http.post<ResponseAPI>(this.apiUrl, juego);
    }
editar(objeto:Videojuegos){
  return this.http.put<ResponseAPI>(this.apiUrl,objeto);
}
  borrar(id: number) {
  return this.http.delete<ResponseAPI>(`${this.apiUrl}${id}`);
}

}
