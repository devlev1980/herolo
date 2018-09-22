import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Movie} from '../models/movie';

@Injectable()
export class DataService {
  private subject = new Subject<any>();

  sendMovies(movies: any) {
    this.subject.next(movies);
  }

  // clearData() {
  //   this.subject.next();
  // }

  getMovies(): Observable<any> {
    return this.subject.asObservable();
  }
  constructor() { }

}
