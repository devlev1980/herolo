import {Directive} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Directive({
  selector: '[appUniqueTitle]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueTitleDirective, multi: true}]
})
export class UniqueTitleDirective implements AsyncValidator {
  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.apiService.validateByTitle(c.value).pipe(
      map(movies => {
        return movies && movies.length > 0 ? {'uniqueTitle': true} : null;
      })
    );

  }


  constructor(private apiService: ApiService) {
  }

}
