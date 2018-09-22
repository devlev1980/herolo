import {Component, ElementRef, EventEmitter, Inject, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Movie} from '../../models/movie';
import {DataService} from '../../services/data.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {TitleValidator} from './titleValidator';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  addMovieForm: FormGroup;
  public onAdd: EventEmitter<any> = new EventEmitter();
  movies: Movie[];

  constructor(private apiService: ApiService, private dataService: DataService,
              @Inject(MAT_DIALOG_DATA) public data: any, private toastrService: ToastrService) {


    this.addMovieForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      director: new FormControl('Corin Hardy', Validators.required),
      genre: new FormControl('Thriller', Validators.required),
      runtime: new FormControl('96 min', Validators.required),
      year: new FormControl('2018', [Validators.required,
        Validators.maxLength(4),
        Validators.minLength(4),
        Validators.pattern('^[0-9]*$')])
    });


  }

  get title() {
    return this.addMovieForm.get('title');
  }

  get director() {
    return this.addMovieForm.get('director');
  }

  get genre() {
    return this.addMovieForm.get('genre');
  }

  get runtime() {
    return this.addMovieForm.get('runtime');
  }

  get year() {
    return this.addMovieForm.get('year');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.onAdd.emit(form);

    this.apiService.addMovie(form).subscribe(result => {
      if (result) {
        this.toastrService.success('Your movie was added successfully');
      }
    });
  }
}




