import {AbstractControl, AsyncValidator, FormGroup, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {ApiService} from '../../services/api.service';
import {map} from 'rxjs/operators';

export class TitleValidator implements AsyncValidator {
  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.apiService.validateByTitle(c.value).pipe(
      map(movies => {
        return movies && movies.length > 0 ? {'uniqueTitle': true} : null;
      })
    );
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

  // static shouldBeUnique(c: AbstractControl): Promise<{ [key: string]: any; }> | Observable<{ [key: string]: any; }> {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (c.value === 'The Nun') {
  //         resolve({shouldBeUnique: true});
  //       } else {
  //         resolve(null);
  //       }
  //     }, 2000);
  //   });
  // }

  constructor(private apiService: ApiService) {

  }

  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }

}
