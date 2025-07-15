import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TiendaService } from '../../services/tienda.service';
import { Videojuegos } from '../../Models/Videojuegos';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule], 
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  private videojuegosServicio = inject(TiendaService);
  public listaVideojuegos: Videojuegos[] = [];
  public displayedColumns: string[] = ['Titulo', 'Genero', 'Plataforma', 'PEGI','Accion'];

  constructor(private router: Router) {
    this.obtenerVideojuegos(); // Carga inicial
  }

  obtenerVideojuegos() {
  this.videojuegosServicio.listar().subscribe({
    next:(data:any) => {
      if(data.length>0){
            this.listaVideojuegos = data;
    }
  },error:(err)=>{
    console.log(err.message)
  }
})
}
  crearV() {
    this.router.navigate(['/videojuegos', 0]);
  }

  editar(objeto: Videojuegos) {
    this.router.navigate(['/videojuegos', objeto.idVideojuego]);
  }

  eliminar(objeto: Videojuegos) {
    if (confirm(`¿Desea eliminar el videojuego "${objeto.titulo}"?`)) {
      this.videojuegosServicio.borrar(objeto.idVideojuego).subscribe({
        next: (data) => {
          if(data.isSuccess){
          this.obtenerVideojuegos();
          }else{
            alert("No se pudo eliminar")
          }
        },
        error: (err) => {
          console.error('Error al eliminar videojuego:', err.message);
          alert('No se pudo eliminar el videojuego');
        }
      });
    }
  }
}
