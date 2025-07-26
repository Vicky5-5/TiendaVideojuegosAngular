import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TiendaService } from '../../services/tienda.service';
import { Videojuegos } from '../../Models/Videojuegos';
import { switchMap, catchError, of } from 'rxjs';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-videojuegos',
  standalone: true,
  templateUrl: './videojuegos.component.html',
  styleUrl: './videojuegos.component.css',
  imports: [MatFormFieldModule,
  MatButtonModule,
  ReactiveFormsModule,MatInputModule]
})
export class VideojuegosComponent implements OnInit {
  @Output() onCloseModel = new EventEmitter();
  formVideojuego: FormGroup;
  idVideojuego: number = 0;

  private videojuegoServicio = inject(TiendaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor(private fb: FormBuilder) { //Creamos un constructor para asegurarnos que se validan todos los datos antes de enviar
    this.formVideojuego = this.fb.group({
      titulo: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
      plataforma: new FormControl('', [Validators.required]),
      pegi: new FormControl('', [Validators.required])
    });
  }
  
  ngOnInit(): void {
    this.route.paramMap //Usa un activeRoute para obtener el parametro id de la URL. Si no extiste continua sin hacer nada
      .pipe(
        switchMap(params => { //El swicth map se usa para encadenar observables
          const param = params.get('id');
          this.idVideojuego = param ? Number(param) : 0;

          if (this.idVideojuego > 0) {
            return this.videojuegoServicio.obtener(this.idVideojuego);
          }
          return of(null);
        }),
        catchError(err => {
          console.error('Error al cargar:', err.message);
          return of(null);
        })
      )
      .subscribe(data => {
        if (data) {
          this.formVideojuego.patchValue({
            titulo: data.titulo,
            genero: data.genero,
            plataforma: data.plataforma,
            pegi: data.pegi
          });
        }
      });
  }

  guardar() {
    const objeto: Videojuegos = {
      idVideojuego: this.idVideojuego,
      titulo: this.formVideojuego.value.titulo,
      genero: this.formVideojuego.value.genero,
      plataforma: this.formVideojuego.value.plataforma,
      pegi: this.formVideojuego.value.pegi
    };

    const accion$ = this.idVideojuego === 0 //Si el videojuego es igual a 0 se crea uno
      ? this.videojuegoServicio.crear(objeto)
      : this.videojuegoServicio.editar(objeto);

    accion$ //Esto sirve para saber a que observable llamar
      .pipe(
        catchError(err => {
          const mensaje = this.idVideojuego === 0
            ? '❌ Error al crear el videojuego'
            : '❌ Error al editar el videojuego';
          console.error(mensaje, err.message);
          alert(mensaje);
          return of(null);
        })
      )
      .subscribe(res => {
        if (res) {
          const mensaje = this.idVideojuego === 0
            ? '✅ Videojuego creado correctamente'
            : '✅ Videojuego editado correctamente';
          alert(mensaje);
          this.router.navigate(['/']);
        }
      });
  }

  volver() {
    this.router.navigate(['/']);
  }
}
