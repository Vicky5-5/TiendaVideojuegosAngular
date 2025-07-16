import { Component, inject, Input, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TiendaService } from '../../services/tienda.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { Videojuegos } from '../../Models/Videojuegos';

@Component({
  selector: 'app-videojuegos',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './videojuegos.component.html',
  styleUrl: './videojuegos.component.css'
})
export class VideojuegosComponent implements OnInit {

  @Input('id') idVideojuego!: number;

  private videojuegoServicio = inject(TiendaService);
  private formBuild = inject(FormBuilder);
  private router = inject(Router);

  public formVideojuego: FormGroup = this.formBuild.group({
    titulo: [''],
    genero: [''],
    plataforma: [''],
    pegi: [0]
  });

  ngOnInit(): void {
    if (this.idVideojuego != 0) {
      this.videojuegoServicio.obtener(this.idVideojuego).subscribe({
        next: (data) => {

        this.formVideojuego.patchValue({
        titulo: data.titulo,
        genero: data.genero,
        plataforma: data.plataforma,
        pegi: data.pegi
        });
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    }
  }

  guardar() {
    const objeto: Videojuegos = {
      idVideojuego: this.idVideojuego,
      titulo: this.formVideojuego.value.titulo,
      genero: this.formVideojuego.value.genero,
      plataforma: this.formVideojuego.value.plataforma,
      pegi: this.formVideojuego.value.pegi
    };

    if (this.idVideojuego === 0) {
      this.videojuegoServicio.crear(objeto).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.router.navigate(['/']);
          } else {
            alert('Error al crear');
          }
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    } else {
      this.videojuegoServicio.editar(objeto).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.router.navigate(['/']);
          } else {
            alert('Error al editar');
          }
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/']);
  }
}
