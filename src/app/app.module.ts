import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {MoviesListComponent} from './movies-list/movies-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from './services/api.service';
import {MaterialModule} from './material.module';
import {AddMovieComponent} from './dialogs/add-movie/add-movie.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {YesNoComponent} from './dialogs/yes-no/yes-no.component';
import {EditDialogComponent} from './dialogs/edit-dialog/edit-dialog.component';
import {SearchFilterPipe} from './movies-list/search-filter.pipe';
import {InputPipe} from './movies-list/input.pipe';
import {DataService} from './services/data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ToastrModule} from 'ngx-toastr';
import { SpecialCharacterDirective } from './movies-list/special-character.directive';
import { UniqueTitleDirective } from './dialogs/add-movie/unique-title.directive';


@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    AddMovieComponent,
    YesNoComponent,
    EditDialogComponent,
    SearchFilterPipe,
    InputPipe,
    SpecialCharacterDirective,
    UniqueTitleDirective,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })

  ],
  providers: [ApiService, DataService,
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}}
  ],
  entryComponents: [AddMovieComponent, YesNoComponent, EditDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
