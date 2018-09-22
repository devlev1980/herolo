import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(movies: any, userInput: any): any {
    if (!userInput) {
      return movies;
    } else if (userInput) {
      return movies.filter((movie) => {
        return movie.title.toLowerCase().includes(userInput.toLowerCase());
      });
    }
  }

}
