import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { VideojuegosComponent } from './Pages/videojuegos/videojuegos.component';

export const routes: Routes = [
{ path: '', component: InicioComponent },
{path:'inicio',component: InicioComponent},
{path:'videojuegos/:id',component: VideojuegosComponent},
{ path: '**', redirectTo: 'inicio' }


];
