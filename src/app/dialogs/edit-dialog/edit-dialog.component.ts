import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService, private toastrService: ToastrService) {
    this.form = new FormGroup({
      title: new FormControl(`${this.data.title}`, Validators.required),
      director: new FormControl(`${this.data.director}`, Validators.required),
      genre: new FormControl(`${this.data.genre}`, Validators.required),
      runtime: new FormControl(`${this.data.runtime}`, Validators.required),
      year: new FormControl(`${this.data.year}`, [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$')])
    });
  }


  ngOnInit() {
  }

  onSaveMovie(form, id) {
    // console.log(form, id);
    this.apiService.updateMovie(form, id).subscribe(result => {
      // console.log('Movie was updated');
      if (result) {
        this.toastrService.success('Your movie was updated successfully');
      }
    }, error => {
      this.toastrService.error('Something went wrong');
    });
  }


}
