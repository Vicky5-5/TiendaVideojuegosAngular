import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config.service';
import { VideojuegosComponent } from './Pages/videojuegos/videojuegos.component';
import { RouterModule } from '@angular/router';
import { InicioComponent } from "./Pages/inicio/inicio.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, InicioComponent],
  template: `
<app-inicio></app-inicio>
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
