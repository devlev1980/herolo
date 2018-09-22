import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Movie} from '../models/movie';
import {map} from 'rxjs/operators';

@Injectable()
export class ApiService {
  movies = {} as Movie[];

  constructor(private _http: HttpClient) {
  }

  getMovies(): Observable<Movie[]> {
    return this._http.get<Movie>(environment.apiURL).pipe(map((data: any) => {
      return data;
    }));
  }
  getMovieById(id) {
    return this._http.get(`${environment.apiURL}?id=${id}`);
  }
  validateByTitle(title) {
    return this._http.get<any[]>(`${environment.apiURL}?title=${title}`);
  }
  addMovie(movie) {
    return this._http.post(environment.apiURL, movie);
  }
  updateMovie(movie, id) {
    const url = environment.apiURL + '/' + id;
    const updatedMovie = {
      id: id,
      title: movie.title,
      year: movie.year,
      runtime: movie.runtime,
      genre: movie.genre,
      director: movie.director
    };
    return this._http.put(url, updatedMovie);
  }

  deleteMovie(id) {
    const url = environment.apiURL + '/' + id;
    return this._http.delete(url, id);
  }

}
