import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SalasComponent } from './salas/salas.component';
import { SalaComponent } from './salas/sala/sala.component';
import { CrearSalaComponent } from './salas/crear-sala/crear-sala.component';
import { RejillaComponent } from './salas/sala/rejilla/rejilla.component';

import { SalasService } from './salas/salas.service';
import { CrearSalaService } from './salas/crear-sala/crear-sala.service';
import { SalaService } from './salas/sala/sala.service';
import { JuegoService } from './salas/sala/juego.service';

const appRoutes: Routes = [
    {
        path: '', component: SalasComponent
    },
    {
        path: 'crear-sala', component: CrearSalaComponent
    },
    {
        path: 'sala/:id', component: SalaComponent
    },
    {
        // añadir Componente 404 not found
        path: '**', redirectTo: '/', pathMatch: 'full'
    }
]

@NgModule({
    declarations: [
        AppComponent,
        RejillaComponent,
        SalasComponent,
        CrearSalaComponent,
        SalaComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [SalasService, CrearSalaService, SalaService, JuegoService],
    bootstrap: [AppComponent]
})
export class AppModule { }
