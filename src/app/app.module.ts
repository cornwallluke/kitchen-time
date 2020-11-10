import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddModalComponent } from './add-modal/add-modal.component';
import { HolderComponent } from './holder/holder.component';

@NgModule({
  declarations: [
    AppComponent,
    AddModalComponent,
    HolderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
