import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Movie} from '../models/movie';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AddMovieComponent} from '../dialogs/add-movie/add-movie.component';
import {YesNoComponent} from '../dialogs/yes-no/yes-no.component';
import {EditDialogComponent} from '../dialogs/edit-dialog/edit-dialog.component';
import {DataService} from '../services/data.service';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  movies: Movie[];
  searchInput: string;
  search: FormControl;

  constructor(private apiService: ApiService, private dialog: MatDialog, private dataService: DataService, private toastrService: ToastrService) {
    // this.search = new FormControl('', Validators.pattern('^[a-zA-Z ]*$'));
  }


  ngOnInit() {

    this.getMovies();
  }


  getMovies() {
    this.apiService.getMovies().subscribe((movies) => {
      if (movies) {
        this.movies = movies;
      } else {
        console.log('error');
      }
    }, err => {
      console.log(err);
    });
  }

  onAddBook() {
    const dialogRef = this.dialog.open(AddMovieComponent, {
      width: '500px',
      data: this.movies
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getMovies();
    }, () => {
      this.toastrService.error('Something went wrong');
    });


  }

  onDeleteMovie(id) {
    this.dialog.open(YesNoComponent, {
      width: '300px',
      data: id
    })
      .afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteMovie(id).subscribe(() => {
          if (result) {
            this.toastrService.error('Your movie was deleted successfully');
            this.getMovies();
          }

        }, () => {
          this.toastrService.error('Something went wrong.Please try again later!');
        });
      }
    });
  }

  onEditMovie(movie) {
    this.dialog.open(EditDialogComponent, {
      width: '600px',
      data: movie
    })
      .afterClosed().subscribe(result => {
      if (result) {
        this.getMovies();
      }
    });
  }

}
