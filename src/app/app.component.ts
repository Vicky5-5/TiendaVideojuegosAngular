import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config.service';
import { VideojuegosComponent } from './Pages/videojuegos/videojuegos.component';
import { RouterModule } from '@angular/router';
import { InicioComponent } from "./Pages/inicio/inicio.component";
import { NavbarComponent } from "./BarraNavegacion/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  template: `<app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  loading = true;
  private configService = inject(ConfigService);

  ngOnInit() {
    this.configService.loadConfig().then(() => {
      this.loading = false;
    }).catch(err => {
      console.error('Error cargando config:', err);
      this.loading = false;
    });
  }
}

