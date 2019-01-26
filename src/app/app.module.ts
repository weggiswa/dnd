import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { NavigationComponent } from './navigation/navigation.component';

// Import KonvaModule
import { KonvaModule } from 'ng2-konva';

@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    KonvaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
